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
    Wasm.register(@process_name)
    {:ok, nil}
  end

  @impl GenServer
  def handle_info(raw_msg, state) when is_wasm_message(raw_msg) do
    new_state = Wasm.handle_message!(raw_msg, &handle_wasm(&1, state))
    {:noreply, new_state}
  end

  defp handle_wasm({:wasm_call, [action, code]}, state) do
    try do
      result = eval(code, action)
      {:resolve, inspect(result), state}
    rescue
      error -> {:reject, Exception.message(error), state}
    end
  end

  defp eval(code, "eval_elixir") do
    {evaluated, _bindings} = Code.eval_string(code, [], __ENV__)
    evaluated
  end
end
