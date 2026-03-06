defmodule TourOfElixirTest do
  use ExUnit.Case
  doctest TourOfElixir

  test "greets the world" do
    assert TourOfElixir.hello() == :world
  end
end
