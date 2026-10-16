#!/usr/bin/env sh
set -eu
cargo build --release --target wasm32-unknown-unknown -p riose-core --lib
mkdir -p science/wasm
cp target/wasm32-unknown-unknown/release/riose_core.wasm science/wasm/riose_core.wasm
