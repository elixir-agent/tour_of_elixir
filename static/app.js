import { Popcorn } from "./wasm/popcorn.js";
import { lessons } from "./lessons.js";

let currentPage = 0;
let popcorn = null;

const $ = (id) => document.getElementById(id);

async function init() {
  popcorn = await Popcorn.init({
    debug: false,
    onStdout: (text) => appendOutput(text, false),
    onStderr: (text) => appendOutput(text, true),
  });

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

  $("output").textContent = "";
  $("result").textContent = "";
  $("status").textContent = "実行中...";
  $("status").className = "running";

  try {
    const { data, durationMs } = await popcorn.call(["eval_elixir", code], {
      timeoutMs: 10000,
    });
    $("result").textContent = `=> ${data}`;
    $("status").textContent = `完了 (${durationMs.toFixed(1)} ms)`;
    $("status").className = "done";
  } catch (error) {
    $("status").textContent = "エラー";
    $("status").className = "error";
    appendOutput(error.message || String(error), true);
  }
}

function appendOutput(text, isError) {
  if (isError) {
    const span = document.createElement("span");
    span.textContent = text;
    span.className = "stderr";
    $("output").appendChild(span);
  } else {
    $("output").appendChild(document.createTextNode(text));
  }
  $("output").appendChild(document.createElement("br"));
  $("output").scrollTop = $("output").scrollHeight;
}

await init();
