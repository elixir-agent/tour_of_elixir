defmodule TourOfElixir.MixProject do
  use Mix.Project

  def project do
    [
      app: :tour_of_elixir,
      version: "0.1.0",
      elixir: "~> 1.17",
      start_permanent: Mix.env() == :prod,
      compilers: Mix.compilers(),
      deps: deps(),
      aliases: aliases()
    ]
  end

  def application do
    [
      extra_applications: [],
      mod: {TourOfElixir.Application, []}
    ]
  end

  defp deps do
    [
      {:popcorn, "~> 0.1.0"}
    ]
  end

  defp aliases do
    [
      build_wasm: ["popcorn.build_runtime --target wasm", "popcorn.cook"]
    ]
  end
end
