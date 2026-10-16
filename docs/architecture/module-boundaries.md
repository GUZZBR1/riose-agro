# Module boundaries

| Module | Owns | Must not own | Current implementation |
| --- | --- | --- | --- |
| Simulation core | Deterministic time, inputs, rule transitions, animal state, snapshots, metrics, comparisons | DOM, rendering, persistence backend | `site/client/engine.js`; native path in `science/crates/riose-core` |
| Scientific models | Versioned equations, units, inputs, provenance, limitations, validation status | UI claims or untracked model changes | `science/runtime/` and registered model contracts |
| Experiment workspace | Configuration, comparison, charting, sensitivity, local history, exports | Scientific formulas or observed-data substitution | `experiments.html`, `product.css`, `site/client/product-app.js` |
| Worker | Isolated JS simulation and versioned message boundary | Presentation state | `site/client/worker.js`, `site/client/worker-protocol.js` |
| Data and reproducibility | Inputs, schemas, results, manifests, source references and retention | Animal model equations | `science/data/`, `science/schemas/`, `science/experiments/`, browser-local history |
| Local service | Static product routes, snapshot review, explanations, optional native execution | Mutating simulation inputs without provenance | `src/server/server.js` |
| Research tooling | Dataset processing, audits, science/runtime/computational benchmarks | Product rendering | `scripts/`, `tests/`, `science/evidence/` |

## Dependency direction

The simulation core is independent of browser presentation. The experiment UI consumes engine outputs; it does not create scientific observations. The Worker is an execution boundary, while the server handles local review and optional native comparison. Python tools read and write versioned evidence files and are not called from per-animal simulation steps. The product has no farm-scene renderer or visual editor.

## Snapshot compatibility

Scientific animal state contains no map coordinates or visual RNG. The JS and Rust readers accept legacy `x`, `y`, target coordinates, and locomotion seed fields, then discard them. New snapshots and parity checks use scientific state. Observational records retain their separate schema and are not directly treated as engine state.
