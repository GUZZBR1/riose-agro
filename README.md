# RIOSE

<p align="center">
  <img src="docs/assets/readme/12-riose-cover-wide.png" alt="RIOSE wordmark and subtitle beside a Nelore cow on a pasture illustration" width="100%">
</p>

**An exploratory livestock simulation and experiment workspace, with a separately scoped AMD ROCm validation record.**

RIOSE compares livestock scenarios in a browser. Results are deterministic demonstrations from simplified rules, not validated forecasts or management recommendations.

[Live demo](https://agro-smallville-mvp.qwdqwdwqdqdqwdwwqqw.chatgpt.site) · [Experiment workspace](experiments.html) · [AMD evidence](docs/evidence/amd/AMD_VALIDATION.md) · [Scientific model notes](docs/modelos/interface-modelos-cientificos.md) · [Repository guide](docs/architecture/repository-layout.md)

`amd` · `rocm` · `pytorch` · `simulation` · `livestock`

## Product workspace

Set a baseline, change one selected factor, and compare the two simulated runs.

<table>
  <thead>
    <tr><th>Experiment workspace</th><th>Scenario comparison</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="docs/assets/readme/01-experiment-workspace-4x5.png" alt="RIOSE experiment workspace with scenario inputs, sensitivity controls, history, and model limitations" width="100%"></td>
      <td><img src="docs/assets/readme/02-scenario-results-4x5.png" alt="Scenario comparison with summary metrics, chart, daily output table, and local history" width="100%"></td>
    </tr>
  </tbody>
</table>

## How it works

<img align="right" width="220" src="docs/assets/readme/04-concept-cow.png" alt="Transparent concept illustration of a Nelore cow; not rendered by the current workspace">

RIOSE is an exploratory prototype with a deterministic JavaScript engine, a browser workspace, reproducible experiment records, optional Rust/WebAssembly components, and separate pages for public observed data.

<br clear="all">

<img align="left" width="240" src="docs/assets/readme/05-concept-road.png" alt="Transparent rural road concept art; not part of the current application">

Each comparison uses the same seed and starting conditions, then changes one selected factor. Inputs, outputs, charts, daily results, and limitations are shown together. Results can be saved in local browser history or exported.

<br clear="all">

## Product walkthrough

The illustrations are concept art only; the current workspace does not render them.

<img align="right" width="230" src="docs/assets/readme/08-concept-pickup.png" alt="Transparent pickup concept art; not rendered by the current workspace">

Open [experiments.html](experiments.html) to configure and run a comparison. The workspace also includes one-factor sensitivity exploration and local run history.

<br clear="all">

<img align="left" width="230" src="docs/assets/readme/09-concept-livestock-truck.png" alt="Transparent livestock truck concept art; not rendered by the current workspace">

[Observed-data pages](adult-data.html) explore published measurements separately; those records do not calibrate or initialize the simulation.

<br clear="all">

## Visual concept

The interface uses an editorial, chart-focused style. The [isometric asset sheet](docs/assets/readme/03-visual-concept-asset-sheet.png) and the illustrations below are concept art only. The current workspace does not render these farm scenes or assets.

<p align="center">
  <img src="docs/assets/readme/06-concept-farmhouse.png" alt="Transparent farmhouse concept illustration" width="260">
  &nbsp;&nbsp;
  <img src="docs/assets/readme/07-concept-barn.png" alt="Transparent barn and tractor concept illustration" width="260">
  <br>
  <sub>Farmhouse and tractor concepts, centered as a pair.</sub>
</p>

## AMD + ROCm evidence

A successful parity run was recorded on a separate release revision, commit [acb5cdf6e3bc23d7e48026bc736da05427f89907](https://github.com/GUZZBR1/riose-agro/commit/acb5cdf6e3bc23d7e48026bc736da05427f89907).

| Workload | Device and runtime | Result |
| --- | --- | --- |
| riose-livestock-metabolism-batch | AMD Instinct MI300X VF · ROCm/HIP 7.14.60850 · PyTorch 2.11.0+rocm7.14.1 | amd_rocm backend; 24 animals; 48 outputs; parity PASS; max absolute difference 0 at 1e-12 tolerances |

This verifies only that workload and environment. It does not establish performance gains, biological validity, or support for the full simulator on current main.

<table>
  <thead>
    <tr><th>01 · AMD environment</th><th>02 · Product validation</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="docs/evidence/amd/01-amd-environment.png" alt="AMD device and runtime environment" width="100%"></td>
      <td><img src="docs/evidence/amd/02-riose-amd-validation.png" alt="AMD product verifier and parity result" width="100%"></td>
    </tr>
    <tr>
      <td colspan="2" align="center"><strong>03 · Backend detection</strong><br><img src="docs/evidence/amd/03-amd-backend-detection.png" alt="ROCm detected; CUDA runtime unavailable" width="72%"></td>
    </tr>
  </tbody>
</table>

See [AMD_VALIDATION.md](docs/evidence/amd/AMD_VALIDATION.md) for run details and reproduction notes.

## Scientific scope and limitations

- The engine uses simplified rules and fixed assumptions; no dataset calibrates the complete simulator.
- Observed measurements and simulated outputs are kept separate. Public-data checks are component diagnostics, not whole-model validation or causal evidence.
- BR-CORTE 2023 calculates dry-matter intake only within its declared domain; weight gain and forage stock are inputs, not predictions from that equation.
- Outputs are illustrative and must not guide real animal-management decisions. Dataset scope and audits are in [docs/evidence](docs/evidence/) and [scientific model notes](docs/modelos/interface-modelos-cientificos.md).

Evidence labels distinguish **SIMULATED**, **OBSERVED**, **ASSUMED**, **EXPERIMENTAL**, **VALIDATED** (only for a documented path and criterion), and **FUTURE** work.

## Repository and local setup

The browser app is in <code>experiments.html</code> and <code>src/client/</code>; the local server and optional compute endpoint are in <code>src/server/</code>. Rust and opt-in WebAssembly components are in <code>crates/riose-core/</code> and <code>wasm/</code>. On current main, the compute endpoint supports numeric vector scaling, not the full farm simulation. See the [repository layout](docs/architecture/repository-layout.md) and [CI guide](docs/ci.md).

Requires Node.js 20 or newer:

~~~bash
npm install
npm start
~~~

Open the local URL and select <code>experiments.html</code>. The server binds to loopback by default; remote access requires <code>ALLOW_REMOTE_ACCESS=true</code> and is unauthenticated. Snapshot review checks a linked file without changing simulation data. The optional WASM metabolism kernel uses <code>experiments.html?engine=wasm</code> and <code>npm run build:wasm</code> (requires Rust's <code>wasm32-unknown-unknown</code> target).

Project pages: [home](home.html) · [manifesto](manifesto.html) · [observed data](adult-data.html) · [adult cow data](adult-cow-data.html).

## License and data

Project code is under the [MIT License](LICENSE). Third-party datasets have separate terms; review their manifests and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) before reuse or redistribution.

## RIOSE

<p align="center">
  <img src="docs/assets/readme/11-riose-landscape.png" alt="RIOSE wordmark and the subtitle Simulating decisions in the physical world over a sunset landscape with cattle" width="100%">
</p>
