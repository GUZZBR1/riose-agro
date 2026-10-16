import assert from 'node:assert/strict';
import test from 'node:test';
import {createServer} from '../src/server/server.js';

async function withServer(t, env = {}) {
  const server = createServer({env});
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return `http://127.0.0.1:${server.address().port}`;
}

test('local API routes reject requests marked as forwarded by a proxy', async t => {
  const root = await withServer(t, {RIOSE_NATIVE_COMPARISON: 'true'});
  const routes = [
    ['/api/validate-snapshot', 'snapshot_api_requires_loopback'],
    ['/api/explain', 'llm_api_requires_loopback'],
    ['/api/interpret-experiment', 'llm_api_requires_loopback'],
    ['/api/native/configured-comparison', 'native_runner_requires_loopback'],
  ];

  for (const [route, error] of routes) {
    const response = await fetch(`${root}${route}`, {
      method: 'POST',
      headers: {'content-type': 'application/json', 'x-forwarded-for': '203.0.113.10'},
      body: '{}',
    });
    assert.equal(response.status, 403, route);
    assert.deepEqual(await response.json(), {error}, route);
  }
});

test('static file routing rejects Windows path separators after URL decoding', async t => {
  const root = await withServer(t);
  const response = await fetch(`${root}/src/client/%2e%2e%5c..%5c.env`);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {error: 'invalid_path'});
});
