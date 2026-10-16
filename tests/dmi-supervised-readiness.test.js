import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';

const reportPath = new URL('../science/evidence/dmi-supervised-readiness-2026-10.json', import.meta.url);
const report = JSON.parse(await readFile(reportPath, 'utf8'));

test('supervised DMI readiness report validates its target, evidence links, and no-go decision', () => {
  const result = spawnSync('python3', ['science/scripts/readiness/validate_dmi_supervised_readiness.py'], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

  assert.equal(report.decision, 'no_go');
  assert.equal(report.estimand.unitOfAnalysis, 'animal-period');
  assert.equal(report.eligibility.outcomeUnit, 'kg DM/animal/day');
  assert.equal(report.reviewedMatrix.reviewedSourceCount, 28);
  assert.equal(report.reviewedMatrix.eligibleSourcesForTarget, 0);
  assert.equal(report.reviewedMatrix.conditionalSourcesForTarget, 0);
  assert.equal(report.reviewedMatrix.ineligibleOrUnavailableSourcesForTarget, 28);
  assert.equal(
    report.reviewedMatrix.eligibleSourcesForTarget + report.reviewedMatrix.conditionalSourcesForTarget + report.reviewedMatrix.ineligibleOrUnavailableSourcesForTarget,
    report.reviewedMatrix.reviewedSourceCount
  );
  assert.equal(report.signoff.status, 'evidence_based_no_go');
  assert.equal(report.signoff.projectOwner, 'not_recorded');
  assert.equal(report.signoff.domainExpertReview, 'not_performed');
  assert.ok(report.blockers.some(reason => reason.includes('No locally accessible')));
  assert.ok(report.nextEvidenceRequired.some(requirement => requirement.includes('individual-level dataset')));
  assert.ok(!report.nextEvidenceRequired.some(requirement => requirement.includes('independent zootechnical review')));
  assert.equal(report.performance.modelTrainingPerformed, false);
  const soares = report.candidateEvidence.find(candidate => candidate.id === 'soares-2026-holstein-gyr-pasture-dmi');
  assert.ok(soares);
  assert.match(soares.populationFit, /dairy cows/i);
  assert.match(soares.outcomeFit, /total DMI/i);
  assert.match(soares.access, /unavailable_or_not_reusable/);
  for (const candidate of report.candidateEvidence) {
    const source = candidate.source.startsWith('data/') ? `science/${candidate.source}` : candidate.source.startsWith('docs/evidence/') ? `science/evidence/${candidate.source.slice('docs/evidence/'.length)}` : candidate.source.startsWith('docs/') ? `science/docs/${candidate.source.slice('docs/'.length)}` : candidate.source;
    assert.equal(existsSync(new URL(`../${source}`, import.meta.url)), true, candidate.source);
    for (const reference of candidate.references) {
      if (!reference.startsWith('http://') && !reference.startsWith('https://')) {
        const canonicalReference = reference.startsWith('data/') ? `science/${reference}` : reference.startsWith('docs/evidence/') ? `science/evidence/${reference.slice('docs/evidence/'.length)}` : reference.startsWith('docs/') ? `science/docs/${reference.slice('docs/'.length)}` : reference;
        assert.equal(existsSync(new URL(`../${canonicalReference}`, import.meta.url)), true, reference);
      }
    }
  }
});
