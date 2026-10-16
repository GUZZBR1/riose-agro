# ACT III owner-publication readiness review

Review date: 15 October 2026

## Verified release gate

- Repository: `santleme/riose-agro`; current visibility is private.
- `release/amd-act-iii`: `acb5cdf6e3bc23d7e48026bc736da05427f89907`.
- Issue #139 is closed; its final comment records `PUBLIC_REPO_SECURITY_PASS` for that exact release SHA. That audit covers the release tree and its reviewed history.
- Issue #140 is closed with `#140_RUNTIME_ASSETS_RELEASE_CLEARED`; the report records 60 runtime assets released and the #98 gate with zero manifest issues.
- The release ref includes a root Apache-2.0 `LICENSE`, `THIRD-PARTY-NOTICES.md`, README, and `docs/evidence/actiii-public-repo-audit-2026-10-15.md`.

## Current-main blockers

This readiness preparation is based on `main` at `fcd4254b1568a4f1fab3078c1beaff8f3f3dec95`. Compared with the release ref, `main` and `release/amd-act-iii` have diverged: main is 46 commits ahead of their merge base `0d79e416a5297b846274001d3b3281a1e674c674`; release is 33 commits ahead of that base. The release audit does not establish that the main-only commits or all repository refs are clear for publication.

Before making the repository public, resolve these items:

1. **XGain dataset rights:** the correction branch removes the source ZIP, derived Parquet, quality report, and processing pipeline. The Zenodo record says CC BY 4.0 while the embedded archive README says CC BY-NC. This branch still inherits earlier commits containing those files, and the remote heads `main`, `actiii/145-readme`, `chore/repository-structure-alignment`, and `codex/guzz-main-readme` retain them. Obtain authoritative terms or coordinate an approved history rewrite for every ref intended for publication; a normal merge of this branch will not remove the files from reachable history.
2. **Audit the publication surface:** re-run the #139 security, privacy, license, data-rights, and history review against the final intended `main` SHA and every ref that will become public. Record the scanned commit/ref scope and results. Do not treat the release-only #139 pass as covering the 46 main-only commits.
3. **Align release and deployment:** confirm which exact `main` SHA is deployed and submitted, then reconcile it with the audited release. The currently divergent branches are not interchangeable.
4. **Finish public checks after owner publication:** when the owner decides the prior gates pass, change visibility manually and test the repository, README, source, LICENSE, notices, and audit/runtime evidence from an unauthenticated session. Record tested URLs and SHA in #141. Close #141 only after those checks succeed.

## Prepared in the security-remediation branch

- Remove XGain source and derived artifacts from the branch's current tree while keeping the rights conflict documented.
- Harden local API and static-file access, bound the optional native process, and correct deployment metadata and data-ingestion path handling.

## Decision

`PUBLIC_REPO_READY_FOR_OWNER_PUBLICATION` is **not yet satisfied**. The XGain conflict and inherited/other-ref history, the remaining reverse-proxy restriction, and final audit of the exact publication refs must be resolved. This branch does not make the repository public.
