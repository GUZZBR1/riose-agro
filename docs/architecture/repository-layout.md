# Repository layout

| Path | Responsibility |
| --- | --- |
| .github/ | CI workflows and repository automation. |
| assets/ | Research-page images and other bundled assets. |
| science/crates/riose-core/ | Deterministic native Rust core and CLI, also built for WASM. |
| science/data/ | Source-specific public datasets, manifests, and processed derivatives. |
| docs/ | Architecture, evidence, scientific references, performance records, and product guidance. |
| science/examples/, science/experiments/ | Runnable examples, research protocols, and reproducible experiment outputs. |
| science/requirements/ | Python requirements that are not pinned to historical root paths. |
| science/schemas/, science/runtime/ | Shared data contracts, scientific model contracts, and adapters. |
| scripts/, tests/ | Build, benchmark, experiment, science, validation tooling and its checks. |
| site/client/, src/server/ | Browser application, simulation, workers, data adapters, and local API. |
| science/wasm/ | Browser WASM modules built from the Rust crate. |

The HTML files in the repository root are public entry points or compatibility routes. / and index.html lead to home.html; product.html and simulator.html retain older entry URLs; experiment, outcome-review, observed-data, and dataset pages are also linked by stable root-relative URLs. Their root-level stylesheets, scripts, and SVG icons remain beside them because published pages request those paths directly and static hosting does not provide rewrite rules.

Root package and Cargo manifests, lockfiles, README, license notices, and Git configuration are repository-level files. The data-audit and optional Parquet requirement files are grouped under science/requirements/. The data-processing and research-ML files stay at root because their paths and bytes are pinned by the frozen scientific baseline and its reproducibility tooling.

The local server serves a documented allowlist of root pages and browser assets. Browser modules use relative paths so the site can be hosted below a repository subpath. Research and observed-data pages remain separate from model-generated results. See tooling-layout.md for command ownership and current-system-audit.md for the runtime map.
