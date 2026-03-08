defmodule TourOfElixir do
  use GenServer
  import Popcorn.Wasm, only: [is_wasm_message: 1]
  alias Popcorn.Wasm

  @process_name :main

  def start_link(_) do
    GenServer.start_link(__MODULE__, nil, name: @process_name)
  end

  @impl GenServer
  def init(_args) do
    # IO.inspect がリンクプロセス経由で exit シグナルを送る場合に備えて
    # exit をメッセージとして受け取る（GenServer がクラッシュしないように）
    Process.flag(:trap_exit, true)
    Wasm.register(@process_name)
    {:ok, nil}
  end

  @impl GenServer
  def handle_info(raw_msg, state) when is_wasm_message(raw_msg) do
    # AtomVM では rescue が正常に動作しない場合があるため Erlang スタイルの catch を使う
    try do
      new_state = Wasm.handle_message!(raw_msg, &handle_wasm(&1, state))
      {:noreply, new_state}
    catch
      :error, _ -> {:noreply, state}
      :exit, _ -> {:noreply, state}
      :throw, _ -> {:noreply, state}
    end
  end

  # IO.inspect 等が内部的に送るメッセージ・EXIT シグナルを無視する
  def handle_info(_msg, state) do
    {:noreply, state}
  end

  defp handle_wasm({:wasm_call, [action, code]}, state) do
    try do
      result = eval(code, action)
      {:resolve, safe_inspect(result), state}
    catch
      :error, {pid, _reason} when is_pid(pid) -> {:resolve, safe_inspect(nil), state}
      :error, reason -> {:reject, safe_inspect(reason), state}
      # AtomVM/Popcorn では IO.puts/IO.inspect 実行時に {pid, reason} の exit が飛ぶことがある。
      # これは実行失敗ではないため reject せず、式の戻り値 nil として扱う。
      :exit, {pid, _reason} when is_pid(pid) -> {:resolve, safe_inspect(nil), state}
      :exit, reason -> {:reject, safe_inspect(reason), state}
      :throw, {pid, _reason} when is_pid(pid) -> {:resolve, safe_inspect(nil), state}
      :throw, value -> {:reject, safe_inspect(value), state}
    end
  end

  defp eval(code, "eval_elixir") do
    # TourOfElixir モジュール環境で評価すると、defmodule が
    # Elixir.TourOfElixir.* として解決され、未ロード時に .beam 取得を試みることがある。
    # ここではトップレベル評価にして不要なモジュール取得を回避する。
    {evaluated, _bindings} = Code.eval_string(code, [], file: "nofile", line: 1)
    evaluated
  end

  # AtomVM は float の inspect/to_string 系で abort するため独自に文字列化する
  defp safe_inspect(value) when is_float(value), do: safe_float_to_string(value)
  defp safe_inspect(value) when is_integer(value), do: safe_integer_to_string(value)
  defp safe_inspect(value) when is_atom(value), do: safe_atom_to_string(value)
  defp safe_inspect(value), do: safe_default_inspect(value)

  @float_precision 15
  @float_scale 1_000_000_000_000_000

  defp safe_float_to_string(value) do
    negative = value < 0.0
    abs_value = if negative, do: -value, else: value
    # 四捨五入だと末尾が繰り上がって桁が不安定になるため、固定スケールで切り捨てる
    scaled = trunc(abs_value * @float_scale)
    int_part = div(scaled, @float_scale)
    frac_part = rem(scaled, @float_scale)

    sign = if negative, do: "-", else: ""

    frac_chars =
      frac_to_charlist(frac_part, @float_precision)
      |> trim_trailing_zeros()

    IO.iodata_to_binary([sign, int_to_charlist(int_part), ".", frac_chars])
  end

  defp digit_char(digit), do: digit + ?0

  defp frac_to_charlist(frac_part, digits) do
    frac_to_charlist(frac_part, pow10_int(digits - 1), [])
  end

  defp frac_to_charlist(_frac_part, 0, acc), do: :lists.reverse(acc)

  defp frac_to_charlist(frac_part, divisor, acc) do
    digit = div(frac_part, divisor)
    rest = rem(frac_part, divisor)
    next_divisor = div(divisor, 10)
    frac_to_charlist(rest, next_divisor, [digit_char(digit) | acc])
  end

  defp trim_trailing_zeros(chars) do
    trimmed_rev = trim_leading_zeros(:lists.reverse(chars))

    case trimmed_rev do
      [] -> "0"
      _ -> :lists.reverse(trimmed_rev)
    end
  end

  defp trim_leading_zeros([?0 | rest]), do: trim_leading_zeros(rest)
  defp trim_leading_zeros(rest), do: rest

  defp pow10_int(0), do: 1
  defp pow10_int(n) when n > 0, do: pow10_int(n, 1)
  defp pow10_int(0, acc), do: acc
  defp pow10_int(n, acc), do: pow10_int(n - 1, acc * 10)

  defp int_to_charlist(0), do: "0"
  defp int_to_charlist(n) when n > 0, do: int_to_charlist_rev(n, [])
  defp int_to_charlist_rev(0, acc), do: acc

  defp int_to_charlist_rev(n, acc) do
    digit = rem(n, 10)
    int_to_charlist_rev(div(n, 10), [digit + ?0 | acc])
  end

  defp safe_integer_to_string(value) do
    try do
      Integer.to_string(value)
    catch
      _kind, _reason -> "<bigint>"
    end
  end

  defp safe_atom_to_string(true), do: "true"
  defp safe_atom_to_string(false), do: "false"
  defp safe_atom_to_string(nil), do: "nil"

  defp safe_atom_to_string(value) do
    try do
      ":" <> Atom.to_string(value)
    catch
      _kind, _reason -> "<atom>"
    end
  end

  defp safe_default_inspect(value) do
    try do
      inspect(value)
    catch
      _kind, _reason -> "<unsupported>"
    end
  end
end
