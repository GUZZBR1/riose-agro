# RIOSE

**An exploratory livestock simulation and experiment workspace, with a separately scoped AMD ROCm validation record.**

RIOSE lets users configure and compare livestock scenarios in a browser. Its outputs are deterministic demonstrations from simplified rules; they are not validated forecasts, biological measurements, or management recommendations.

[Live demo](https://agro-smallville-mvp.qwdqwdwqdqdqwdwwqqw.chatgpt.site) · [Experiment workspace](experiments.html) · [AMD evidence](docs/evidence/amd/AMD_VALIDATION.md) · [Scientific model notes](docs/modelos/interface-modelos-cientificos.md) · [Repository guide](docs/architecture/repository-layout.md)

## 1. Product workspace

The current workspace is a browser interface for setting a baseline, changing one selected factor, and reviewing the two simulated runs. The screenshots below were captured from the repository's current `experiments.html` page.

<table>
  <thead>
    <tr>
      <th>Experiment workspace</th>
      <th>Scenario comparison</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="docs/assets/readme/01-experiment-workspace-4x5.png" alt="RIOSE experiment workspace with baseline and intervention inputs, sensitivity controls, history, and model limitations" width="100%"></td>
      <td><img src="docs/assets/readme/02-scenario-results-4x5.png" alt="RIOSE scenario comparison results with summary cards, a weight chart, daily output table, and local history" width="100%"></td>
    </tr>
  </tbody>
</table>

## 2. What RIOSE is

RIOSE is an exploratory software prototype for livestock scenario comparison and research data exploration. It combines a deterministic JavaScript engine with a browser workspace, reproducible experiment records, selected Rust/WebAssembly components, and pages that display public observed datasets separately from simulated outputs.

<p align="center"><img src="docs/assets/readme/04-concept-cow.png" alt="Concept illustration of a Nelore cow; this artwork is not rendered in the current workspace" width="280"><br><sub>Concept art from the project's visual exploration; not an in-app feature.</sub></p>

The institutional home is [home.html](home.html). The quantitative workspace is [experiments.html](experiments.html). Older [product.html](product.html) and [simulator.html](simulator.html) URLs are compatibility redirects.

## 3. The problem

Livestock scenario tools can blur assumptions, observed records, and model outputs. That makes it hard to see which inputs changed, how a comparison was produced, and what evidence supports it.

## 4. The current approach

The workspace gives both scenarios the same seed, starting state, herd size, horizon, and unchanged settings, then changes one selected factor. It presents the inputs, outputs, charts, daily results, and limitations together. The engine runs locally in the browser; a comparison can be retained in that browser's local history and exported.

This makes experiments inspectable and repeatable. It does not make their outputs scientifically validated.

<p align="center"><img src="docs/assets/readme/05-concept-road.png" alt="Isometric concept illustration of a rural road; not part of the current application interface" width="300"><br><sub>Rural road concept art, shown as a visual reference only.</sub></p>

## 5. Product walkthrough

Start at [experiments.html](experiments.html). Choose the herd size, seed, and time horizon, set the reference scenario, select the intervention factor, and run the comparison. The results view includes summary metrics, a time-series chart, daily output rows, and expandable input and limitation details.

The workspace also includes one-factor sensitivity exploration and a local run history. History stays in the browser unless the user exports it. The [observed-data pages](adult-data.html) provide a separate way to explore published measurements; those records are not silently used to calibrate or initialize the simulation.

<p align="center"><img src="docs/assets/readme/08-concept-pickup.png" alt="Isometric concept illustration of a rural pickup truck; not rendered in the current workspace" width="300"><br><sub>Pickup illustration from the concept art set; it is not a current product feature.</sub></p>

## 6. Visual identity and concept art

The current workspace uses an editorial, chart-focused interface: warm neutral surfaces, restrained green accents, clear labels, and compact experiment controls. Its visual language is meant to keep scenario inputs and outputs legible.

The attached [isometric asset sheet](docs/assets/readme/03-visual-concept-asset-sheet.png) is a **concept reference**. The current workspace does not render these illustrations: the farm-scene renderer, map, sprite atlas, 3D models, and visual scene editor were removed. The separated house and barn illustrations below show part of that visual exploration, not current product screens or shipped simulation features.

<table>
  <thead>
    <tr>
      <th>Farmhouse concept</th>
      <th>Barn and equipment concept</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="docs/assets/readme/06-concept-farmhouse.png" alt="Isometric farmhouse concept illustration; not rendered in the current workspace" width="100%"></td>
      <td><img src="docs/assets/readme/07-concept-barn.png" alt="Isometric barn, tractor, and hay concept illustration; not rendered in the current workspace" width="100%"></td>
    </tr>
  </tbody>
</table>

## 7. AMD + ROCm validation

A successful hardware run was recorded for a specific livestock metabolism batch on the ACT III release revision. The record is tied to branch `release/amd-act-iii` and commit [`acb5cdf6e3bc23d7e48026bc736da05427f89907`](https://github.com/GUZZBR1/riose-agro/commit/acb5cdf6e3bc23d7e48026bc736da05427f89907).

| Check | Recorded result |
| --- | --- |
| GPU | AMD Instinct MI300X VF |
| ROCm/HIP | 7.14.60850 |
| PyTorch | 2.11.0+rocm7.14.1 |
| Workload | `riose-livestock-metabolism-batch` |
| Population and output | 24 animals · 48 output values |
| Backend | `amd_rocm` |
| Parity | PASS · maximum absolute difference 0 · absolute and relative tolerances 1e-12 |
| Verifier | `AMD_PRODUCT_PATH_FUNCTIONAL` |
| Fallback | None in the successful verifier run |

These results show execution and numerical parity for the recorded workload, device, and runtime. They do not show performance improvement or validate the entire simulator, its biological assumptions, farm-level outcomes, or every hardware code path. The evidence is from a separate release revision; it must not be read as proof that the current `main` workspace runs this AMD product path.

### Notebook evidence

<table>
  <thead>
    <tr>
      <th>01 · AMD environment</th>
      <th>02 · Product validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="docs/evidence/amd/01-amd-environment.png" alt="Notebook environment showing the AMD device, runtime versions, and compute service startup" width="100%"></td>
      <td><img src="docs/evidence/amd/02-riose-amd-validation.png" alt="Verifier output showing AMD_PRODUCT_PATH_FUNCTIONAL, amd_rocm, 24 animals, 48 outputs, and parity pass" width="100%"></td>
    </tr>
    <tr>
      <td colspan="2" align="center">
        <strong>03 · Backend detection</strong><br>
        <img src="docs/evidence/amd/03-amd-backend-detection.png" alt="Backend detection showing ROCm available and CUDA runtime unavailable" width="72%">
      </td>
    </tr>
  </tbody>
</table>

The first two captures are paired for comparison; the backend-detection capture is shown on its own row for legibility.

See [AMD_VALIDATION.md](docs/evidence/amd/AMD_VALIDATION.md) for the run record and reproduction notes.

## 8. Technical architecture

- `experiments.html` provides the current scenario comparison interface.
- `src/client/engine.js` and `src/client/feeding-model.js` contain deterministic JavaScript model logic; `src/client/worker.js` runs comparison work away from the main interface.
- `crates/riose-core/` contains the native Rust implementation and CLI; `wasm/` contains opt-in browser WebAssembly modules.
- `src/server/server.js` serves the local application and its optional APIs.
- `src/server/compute_service.py` is a separate compute endpoint. On current `main`, it supports a numeric vector-scaling operation; it does not run the full farm simulation.
- `data/`, `schemas/`, `scientific/`, `experiments/`, and `docs/evidence/` hold datasets, contracts, model interfaces, reproducible diagnostics, and evidence.

See the [repository layout guide](docs/architecture/repository-layout.md) for more detail.

## 9. Scientific foundation and data boundaries

The general engine uses simplified rules and fixed assumptions. The available BR-CORTE 2023 equation calculates dry-matter intake (CMS) only within its declared domain; average daily gain (GMD) and forage stock are inputs, not outputs predicted by that equation. No scientific dataset has calibrated the complete engine.

Observed records are shown as observed data. Engine results are simulated outputs. A comparison against a dataset can be a component diagnostic without constituting whole-model validation, calibration, or a prediction interval.

Selected public-data diagnostics are deliberately narrow:

- USDA/CPER yearling steer data: on a 343-animal held-out set, the engine's ADG MAE was 0.414 kg/day versus 0.164 kg/day for a constant pre-2014 historical baseline. A weighing/shrink protocol change limits the baseline comparison.
- USDA-CGREC steers: the CPER-trained ADG scale was transferred without refitting; MAE was 0.222 kg/day across 291 records and 0.191 kg/day in 2015 (n=200). The 1994 subset was small (n=14) and had high error.
- UFMS/Mendeley Nelore grazing: the frozen no-fit ADG diagnostic covers 390 repeated animal-period rows from 26 males around 20 months old. Reported GMD conflicts with 154 rows; endpoint weights and dates were used. MAE was 0.449 kg/day, with an animal-cluster metric-stability interval of 0.418–0.482.
- Mendeley Nellore feedlot: a separate out-of-domain DMI diagnostic compares a frozen default rule with 219 exact-date weight/DMI pairs.
- SDSU Angus cows on hay: a separate out-of-domain DMI check has seven complete-case animal tags and 571 same-day positive-weight pairs.
- Zenodo mature-cow allometry: the no-fit ADG diagnostic assumes a 70-day interval because exact individual dates and management inputs are absent.

These diagnostics do not support causal treatment claims, calibrate production uncertainty, align all management inputs, or validate the complete simulator. Dataset scope, provenance, and reproduction commands are documented alongside each audit and manifest.

## 10. Evidence labels

Use these terms to distinguish evidence types:

- **SIMULATED** — generated by the engine from its rules and scenario inputs.
- **OBSERVED** — measured or reported by a cited data source.
- **ASSUMED** — supplied as an input or fixed rule without direct observation in that run.
- **EXPERIMENTAL** — an optional, prototype, or not-yet-adopted software path.
- **VALIDATED** — limited to the exact software path, workload, environment, and criterion documented; it does not imply biological validity.
- **FUTURE** — proposed work, not an available capability.

## 11. Validation summary

Software tests and deterministic scenario checks can establish reproducibility, contract behavior, and implementation parity for their tested cases. They are not evidence of biological accuracy. The AMD record above establishes a successful execution and parity result only for its specified release commit and workload.

The repository's [CI guide](docs/ci.md) lists supported automated checks and toolchains.

## 12. Live demo and pages

- [Live demo](https://agro-smallville-mvp.qwdqwdwqdqdqwdwwqqw.chatgpt.site) — reachable when this README was prepared.
- [Experiment workspace](experiments.html) — main scenario comparison page.
- [Institutional home](home.html) and [manifesto](manifesto.html).
- [Observed-data pages](adult-data.html), [adult-cow data](adult-cow-data.html), and other source-specific explorers linked from the repository.

## 13. Run locally

Requires Node.js 20 or newer. From the repository root:

~~~bash
npm install
npm start
~~~

Open the local URL printed by the server and select `experiments.html`. The server binds to loopback by default. Snapshot review validates a linked file locally; it does not apply uploaded data to a simulation. Exposing the server to another host requires `ALLOW_REMOTE_ACCESS=true` because snapshot validation is unauthenticated.

To select the optional WASM metabolism kernel in the comparison Worker, open `experiments.html?engine=wasm`. Rebuild the served module with `npm run build:wasm`; this requires the Rust `wasm32-unknown-unknown` target.

## 14. Reproduce the AMD evidence

The AMD livestock verifier belongs to the release revision named above, not current `main`. In a separate checkout with a compatible ROCm environment and its documented PyTorch build, use:

~~~bash
git checkout --detach acb5cdf6e3bc23d7e48026bc736da05427f89907
python3 src/server/compute_service.py
# In a second terminal:
npm start
# In another terminal:
npm run verify:amd-livestock
~~~

The evidence record explains the workload and parity check. The verifier must report the AMD backend actually used; a CPU fallback is not a successful AMD validation.

## 15. Repository guide

- `home.html`, `manifesto.html` — institutional project pages.
- `experiments.html` — experiment workspace.
- `src/client/` — browser application, deterministic engine, and Worker protocol.
- `src/server/` — local server and compute service.
- `crates/riose-core/`, `wasm/` — Rust and WebAssembly components.
- `scientific/`, `data/`, `schemas/` — model contracts, source data, and validation schemas.
- `scripts/`, `tests/`, `docs/evidence/` — audits, software checks, and retained evidence.

## 16. Current limitations

RIOSE is an illustrative software prototype, not a validated livestock or nutrition model. Its simulated outputs must not guide real animal-management decisions. Assumptions are recorded in the engine and model documentation.

No scientific dataset has calibrated the full engine. Public comparisons are scoped diagnostics only; several cohorts are young stock or out of the approved grazing domain. The USDA/CPER cohort is yearling steers, not mature cows, and its fit to an adult product scope needs independent zootechnical review. Explanations from fixed rules or an optional language provider are not scientific results and cannot change simulation outputs.

The separate [rangeland behavior prototype](rangeland-behavior.html) explores video-annotated records from 24 mature cows. It contains no ADG, weight, or DMI and is not integrated into the simulation engine.

The [publication-readiness review](docs/evidence/actiii-owner-publication-readiness.md) records an unresolved third-party dataset rights issue. Review source licenses and attribution before redistribution.

## 17. Team

This repository does not publish a formal team roster. See the repository's contributor and commit history for recorded contributions.

## 18. License

Project code is licensed under the [Apache License 2.0](LICENSE). Third-party datasets have separate terms; check each dataset's manifest and [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) before reuse or redistribution.
