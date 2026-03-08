import { Popcorn } from "./wasm/popcorn.js?v=20260308b";
import { lessons } from "./lessons.js?v=20260308m";

let currentPage = 0;
let popcorn = null;
const APP_VERSION = "20260308zo";
let lastStdoutLine = "";

const $ = (id) => document.getElementById(id);

async function init() {
  await forceDisableBrowserCache();

  popcorn = await createPopcornInstance();

  $("run-btn").onclick = runCode;
  $("reset-btn").onclick = resetCode;
  $("prev-btn").onclick = () => navigate(-1);
  $("next-btn").onclick = () => navigate(1);

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  });

  buildPageList();
  loadPage(0);
  $("loading").style.display = "none";
  $("app").style.display = "flex";
  $("app").style.flexDirection = "column";
  $("app").style.height = "100vh";
  $("status").textContent = `ready (${APP_VERSION})`;
}

async function createPopcornInstance() {
  return Popcorn.init({
    debug: false,
    onStdout: (text) => appendOutput(text, false),
    onStderr: (text) => appendOutput(text, true),
  });
}

async function reinitPopcornInstance() {
  try {
    if (popcorn && typeof popcorn.deinit === "function") {
      popcorn.deinit();
    }
  } catch {
    // no-op
  }
  popcorn = await createPopcornInstance();
}

async function forceDisableBrowserCache() {
  try {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        await reg.unregister();
      }
    }
    if (typeof caches !== "undefined") {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // no-op
  }
}

function buildPageList() {
  const select = $("page-select");
  let currentChapter = null;
  let optgroup = null;

  lessons.forEach((lesson, i) => {
    if (lesson.chapter !== currentChapter) {
      currentChapter = lesson.chapter;
      optgroup = document.createElement("optgroup");
      optgroup.label = lesson.chapter;
      select.appendChild(optgroup);
    }
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${i + 1}. ${lesson.title}`;
    (optgroup || select).appendChild(opt);
  });

  select.onchange = () => loadPage(parseInt(select.value));
}

function loadPage(index) {
  currentPage = index;
  const lesson = lessons[currentPage];

  const titleEl = $("lesson-title");
  titleEl.innerHTML = "";
  if (lesson.chapter) {
    const badge = document.createElement("span");
    badge.className = "chapter-badge";
    badge.textContent = lesson.chapter;
    titleEl.appendChild(badge);
  }
  titleEl.appendChild(document.createTextNode(
    `${currentPage + 1}/${lessons.length} — ${lesson.title}`
  ));
  $("lesson-content").innerHTML = lesson.description;
  $("code-editor").value = lesson.defaultCode;
  $("output").textContent = "";
  $("result").textContent = "";
  $("status").textContent = "";
  $("page-select").value = currentPage;

  $("prev-btn").disabled = currentPage === 0;
  $("next-btn").disabled = currentPage === lessons.length - 1;

  $("page-indicator").textContent = `${currentPage + 1} / ${lessons.length}`;
}

function navigate(delta) {
  const next = currentPage + delta;
  if (next >= 0 && next < lessons.length) {
    loadPage(next);
  }
}

function resetCode() {
  $("code-editor").value = lessons[currentPage].defaultCode;
  $("output").textContent = "";
  $("result").textContent = "";
  $("status").textContent = "";
}

async function runCode() {
  const code = $("code-editor").value.trim();
  if (!code) return;

  lastStdoutLine = "";
  $("output").textContent = "";
  $("result").textContent = "";
  $("status").textContent = "実行中...";
  $("status").className = "running";

  if (handlePowDisplayInJs(code)) {
    return;
  }

  if (handleSimpleNumericPutsInJs(code)) {
    return;
  }

  try {
    const { transformedCode } = prepareCode(code);
    const response = await callWithAbortRecovery(code, transformedCode);
    const { data, durationMs } = response;
    let resultText = coerceResultText(data);
    if (shouldUseResultFallback(resultText) && lastStdoutLine) {
      resultText = lastStdoutLine;
    }
    $("result").textContent = `=> ${resultText}`;
    $("status").textContent = `完了 (${durationMs.toFixed(1)} ms)`;
    $("status").className = "done";
  } catch (error) {
    $("status").textContent = "エラー";
    $("status").className = "error";
    appendOutput(formatError(error), true);
  }
}

async function callWithAbortRecovery(originalCode, transformedCode) {
  try {
    return await popcorn.call(["eval_elixir", transformedCode], { timeoutMs: 10000 });
  } catch (firstError) {
    if (!isAbortError(firstError)) throw firstError;

    await reinitPopcornInstance();
    const retryCode = transformCodeFallback(originalCode);
    try {
      return await popcorn.call(["eval_elixir", retryCode], { timeoutMs: 10000 });
    } catch (secondError) {
      if (!isAbortError(secondError)) throw secondError;

      await reinitPopcornInstance();
      return popcorn.call(["eval_elixir", originalCode], { timeoutMs: 10000 });
    }
  }
}

function isAbortError(error) {
  const text = formatError(error);
  return /Aborted\(\)|\bAborted\b/i.test(text);
}

function transformCodeFallback(code) {
  // Abort 切り分けのためフォールバックでもコードは変更しない
  return code;
}

function prepareCode(code) {
  return {
    transformedCode: transformCode(code),
  };
}

function shouldUseResultFallback(resultText) {
  return resultText === "nil" || resultText === "";
}

function coerceResultText(data) {
  if (data == null) return "nil";

  if (typeof data === "object") {
    if (typeof data.error === "string") {
      return normalizeQuotedNumber(data.error);
    }
    try {
      return normalizeQuotedNumber(JSON.stringify(data));
    } catch {
      return normalizeQuotedNumber(String(data));
    }
  }

  return normalizeQuotedNumber(String(data));
}

function handleSimpleNumericPutsInJs(code) {
  const lines = code
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  if (lines.length === 0) return false;

  const values = [];
  for (const line of lines) {
    const codeOnly = line.replace(/\s+#.*$/, "").trim();
    const m = codeOnly.match(/^IO\.puts\s*\((.*)\)\s*$/);
    if (!m) return false;
    const formatted = formatNumericPutsExpression(m[1].trim());
    if (formatted == null) return false;
    values.push(formatted);
  }

  for (const v of values) {
    appendOutput(v, false);
  }
  $("result").textContent = "=> :ok";
  $("status").textContent = "完了 (JS fallback)";
  $("status").className = "done";
  return true;
}

function handlePowDisplayInJs(code) {
  const m = code.match(/^\s*IO\.(inspect|puts)\s*\(\s*(\d+)\s*\*\*\s*(\d+)\s*\)\s*$/);
  if (!m) return false;

  const mode = m[1];
  const base = BigInt(m[2]);
  const exp = BigInt(m[3]);
  const result = (base ** exp).toString();

  appendOutput(result, false);
  $("result").textContent = mode === "inspect" ? `=> ${result}` : "=> :ok";
  $("status").textContent = "完了 (JS fallback)";
  $("status").className = "done";
  return true;
}

function transformCode(code) {
  // 安全性を優先し、Abort を増やしにくい限定変換のみ適用
  let rewritten = code;

  // defmodule 内の module attribute 展開（AtomVM 非対応対策）
  rewritten = expandModuleAttributes(rewritten);

  // Float.to_string(数値リテラル) だけを文字列リテラルに置換
  rewritten = rewritten.replace(
    /Float\.to_string\(\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)\s*\)/gi,
    (_m, literal) => elixirStringLiteral(literal)
  );

  // Integer.parse/1 を AtomVM 安全互換へ差し替え
  if (/\bInteger\.parse\s*\(/.test(rewritten)) {
    const parseFnName = "popcorn_integer_parse_fn";
    rewritten = rewritten.replace(/\bInteger\.parse\s*\(/g, `${parseFnName}.(`);
    rewritten =
      `${parseFnName} = fn input ->\n` +
      `  case input do\n` +
      `    <<>> -> :error\n` +
      `    bin when is_binary(bin) ->\n` +
      `      {sign, rest} =\n` +
      `        case bin do\n` +
      `          <<?-, t::binary>> -> {-1, t}\n` +
      `          <<?+, t::binary>> -> {1, t}\n` +
      `          _ -> {1, bin}\n` +
      `        end\n` +
      `\n` +
      `      chars = :erlang.binary_to_list(rest)\n` +
      `      {digits, tail} = :lists.splitwith(fn c -> c >= ?0 and c <= ?9 end, chars)\n` +
      `\n` +
      `      case digits do\n` +
      `        [] -> :error\n` +
      `        _ -> {sign * :erlang.list_to_integer(digits), :erlang.list_to_binary(tail)}\n` +
      `      end\n` +
      `\n` +
      `    _ -> :error\n` +
      `  end\n` +
      `end\n\n` +
      rewritten;
  }

  // IO.puts(浮動小数点リテラル) は inspect 文字列経由に置換して AtomVM abort を回避
  rewritten = rewritten.replace(
    /^(\s*)IO\.puts\s*\(\s*([+-]?(?:(?:\d+\.\d+)|(?:\d+)|(?:\.\d+))(?:e[+-]?\d+)?)\s*\)\s*(?:#.*)?$/gim,
    (_m, indent, literal) => `${indent}IO.inspect(${elixirStringLiteral(literal)})`
  );

  // IO.puts(単純な数値式) を JS で評価して表示に固定
  rewritten = rewritten.replace(
    /^(\s*)IO\.puts\s*\(\s*(.*)\s*\)\s*(?:#.*)?$/gm,
    (m, indent, expr) => {
      const formatted = formatNumericPutsExpression(expr.trim());
      if (formatted == null) return m;
      return `${indent}IO.inspect(${elixirStringLiteral(formatted)})`;
    }
  );

  // IO.inspect(<int> ** <int>) は JS 側で事前計算して巨大整数を文字列として表示
  rewritten = rewritten.replace(
    /^(\s*)IO\.inspect\s*\(\s*(\d+)\s*\*\*\s*(\d+)\s*\)\s*(?:#.*)?$/gm,
    (m, indent, base, exp) => {
      try {
        const result = (BigInt(base) ** BigInt(exp)).toString();
        return `${indent}IO.inspect(${elixirStringLiteral(result)})`;
      } catch {
        return m;
      }
    }
  );

  // 数値化できない puts 行も含めて、AtomVM で不安定な IO.puts 経路を回避する
  rewritten = rewritten
    .split("\n")
    .map((line) => {
      const m = line.match(/^(\s*)IO\.puts\s*\((.*)\)\s*(#.*)?$/);
      if (!m) return line;
      const indent = m[1];
      const expr = m[2];
      const comment = m[3] ? ` ${m[3]}` : "";
      return `${indent}IO.inspect(${expr})${comment}`;
    })
    .join("\n");

  // IO.inspect(数値式) も文字列化して、AtomVM 側の丸め(例: 3.333)を回避
  rewritten = rewritten.replace(
    /^(\s*)IO\.inspect\s*\(\s*(.*)\s*\)\s*(?:#.*)?$/gm,
    (m, indent, expr) => {
      const formatted = formatNumericPutsExpression(expr.trim());
      if (formatted == null) return m;
      return `${indent}IO.inspect(${elixirStringLiteral(formatted)})`;
    }
  );

  return rewritten;
}

function expandModuleAttributes(code) {
  return code.replace(/defmodule\s+[A-Za-z0-9_.]+\s+do[\s\S]*?\nend/g, (block) => {
    const lines = block.split("\n");
    const attrs = new Map();
    const skip = new Set([
      "moduledoc", "doc", "typedoc", "spec", "type", "typep", "callback",
      "macrocallback", "derive", "behaviour", "impl", "compile", "external_resource"
    ]);

    const stripped = lines.map((line) => {
      const m = line.match(/^(\s*)@([a-z_]\w*)\s+(.+)$/);
      if (!m) return line;
      const name = m[2];
      const expr = m[3].trim();
      if (skip.has(name)) return line;
      attrs.set(name, expr);
      return "";
    });

    let out = stripped.join("\n");
    for (const [name, expr] of attrs.entries()) {
      const re = new RegExp(`@${name}\\b`, "g");
      out = out.replace(re, `(${expr})`);
    }
    return out;
  });
}

function integerParseLiteralToElixir(str) {
  const m = str.match(/^[+-]?\d+/);
  if (!m) return ":error";
  const num = BigInt(m[0]).toString();
  const rem = str.slice(m[0].length).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  return `{${num}, "${rem}"}`;
}

function tryEvalNumericExpr(expr) {
  // Elixir の数値系呼び出しを JS へ対応付け
  let js = expr
    .replace(/:math\.pi\(\)/g, "Math.PI")
    .replace(/:math\.sqrt\(/g, "Math.sqrt(")
    .replace(/:math\.log\(/g, "Math.log(")
    .replace(/\btrunc\(/g, "__trunc(")
    .replace(/\bround\(/g, "__round(")
    .replace(/\bfloor\(/g, "__floor(")
    .replace(/\bceil\(/g, "__ceil(")
    .replace(/\babs\(/g, "__abs(")
    .replace(/\bdiv\(/g, "__div(")
    .replace(/\brem\(/g, "__rem(");

  // 安全のため数値演算に必要なトークンだけ許可
  const sanitized = js
    .replace(/Math\.(PI|sqrt|log)/g, "")
    .replace(/__(trunc|round|floor|ceil|abs|div|rem)/g, "");
  if (!/^[0-9a-fA-Fxob+\-*/().,\seE_]*$/.test(sanitized)) return null;

  js = js.replace(/_/g, "");

  try {
    const value = Function(
      `"use strict";
       const __trunc = (n) => Math.trunc(n);
       const __round = (n) => Math.round(n);
       const __floor = (n) => Math.floor(n);
       const __ceil = (n) => Math.ceil(n);
       const __abs = (n) => Math.abs(n);
       const __div = (a, b) => (a / b) < 0 ? Math.ceil(a / b) : Math.floor(a / b);
       const __rem = (a, b) => a - __div(a, b) * b;
       return (${js});`
    )();
    if (typeof value !== "number" || !Number.isFinite(value)) return null;
    return value.toString();
  } catch {
    return null;
  }
}

function formatNumericPutsExpression(expr) {
  if (/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)e[+-]?\d+$/i.test(expr)) {
    return expr;
  }

  const evaluated = tryEvalNumericExpr(expr);
  if (evaluated == null) return null;

  const n = Number(evaluated);
  if (!Number.isFinite(n)) return null;

  if (expr.includes("/")) {
    return formatWithPrecision16(n);
  }

  if (Number.isInteger(n)) {
    if (/\btrunc\s*\(/.test(expr)) return `${n}`;
    if (/[.eE]|\/|:math\./.test(expr)) return `${n}.0`;
    return `${n}`;
  }

  return formatWithPrecision16(n);
}

function formatWithPrecision16(n) {
  const p = n.toPrecision(16);
  if (/[eE]/.test(p)) return p.replace(/e\+?/i, "e");
  return p
    .replace(/(\.\d*?[1-9])0+$/, "$1")
    .replace(/\.0+$/, ".0");
}

function elixirStringLiteral(text) {
  const escaped = String(text).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  return `"${escaped}"`;
}

function normalizeQuotedNumber(value) {
  const text = typeof value === "string" ? value : String(value);
  const unquoted = text.replace(/"([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)"/gi, "$1");
  return decodeInspectedBinary(normalizeFloatPrecision(unquoted));
}

function normalizeFloatPrecision(text) {
  // 10進小数表記のみ対象（指数表記は入力のまま維持）
  return text.replace(
    /(^|[^A-Za-z0-9_])([+-]?\d+\.(\d{15,}))(?=$|[^A-Za-z0-9_])/g,
    (_m, head, full) => {
      const n = Number(full);
      if (!Number.isFinite(n)) return `${head}${full}`;

      // IEEE754 double の表示に近い 16 桁有効数字へ正規化
      const p = n.toPrecision(16);
      if (/[eE]/.test(p)) return `${head}${full}`;

      const normalized = p
        .replace(/(\.\d*?[1-9])0+$/, "$1")
        .replace(/\.0+$/, ".0");

      return `${head}${normalized}`;
    }
  );
}

function decodeInspectedBinary(text) {
  if (typeof TextDecoder === "undefined") return text;
  return text.replace(/<<\s*([0-9,\s]+)\s*>>/g, (full, body) => {
    const bytes = body
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isInteger(n) && n >= 0 && n <= 255);

    if (bytes.length === 0) return full;

    // AtomVM の文字列化で先頭に NUL が混ざるケースを吸収
    let start = 0;
    while (start < bytes.length && bytes[start] === 0) start += 1;
    const sliced = bytes.slice(start);
    if (sliced.length === 0) return full;

    try {
      const decoded = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(sliced));
      if (/[^\x09\x0A\x0D\x20-\x7E]/.test(decoded) || /[A-Za-z0-9]/.test(decoded)) {
        return decoded;
      }
      return full;
    } catch {
      return full;
    }
  });
}

function formatError(error) {
  if (typeof error === "string") return error;
  if (error?.message && typeof error.message === "string") return error.message;
  if (error?.data && typeof error.data === "string") return error.data;
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

function appendOutput(text, isError) {
  const normalized = normalizeQuotedNumber(text);
  if (shouldSuppressNoise(normalized)) return;
  if (isError) {
    const span = document.createElement("span");
    span.textContent = normalized;
    span.className = "stderr";
    $("output").appendChild(span);
  } else {
    if (normalized.trim()) {
      lastStdoutLine = normalized.trim();
    }
    $("output").appendChild(document.createTextNode(normalized));
  }
  $("output").appendChild(document.createElement("br"));
  $("output").scrollTop = $("output").scrollHeight;
}

function shouldSuppressNoise(text) {
  return (
    /Downloading\s+Elixir\..+\.beam\s+failed/i.test(text) ||
    /Failed load module:\s+Elixir\..+\.beam/i.test(text) ||
    /HTTP failure status code:\s*404/i.test(text)
  );
}

await init();
