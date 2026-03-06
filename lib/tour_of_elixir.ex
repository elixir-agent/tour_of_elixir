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
      :error, reason -> {:reject, safe_inspect(reason), state}
      :exit, reason -> {:reject, safe_inspect(reason), state}
      :throw, value -> {:reject, safe_inspect(value), state}
    end
  end

  defp eval(code, "eval_elixir") do
    {evaluated, _bindings} = Code.eval_string(code, [], __ENV__)
    evaluated
  end

  # AtomVM は Inspect.Float が未実装のため float を inspect するとクラッシュする
  defp safe_inspect(value) when is_float(value), do: Float.to_string(value)
  defp safe_inspect(value), do: inspect(value)
end
