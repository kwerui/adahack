const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function server(fetch) {
  const source = fs.readFileSync('lib/environment-server.ts', 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const context = { exports: {}, fetch, AbortSignal, Date, Response, URL, console };
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const postcode = { result: { postcode: 'E8 1EA', latitude: 51.545, longitude: -0.056, region: 'London', admin_district: 'Hackney', outcode: 'E8' } };
const json = value => new Response(JSON.stringify(value), { headers: { 'Content-Type': 'application/json' } });

test('invalid postcode is rejected before contacting a provider', async () => {
  let calls = 0;
  const api = server(async () => { calls++; return json({}); });
  await assert.rejects(api.lookupPostcode('not a postcode'), error => error.status === 400);
  assert.equal(calls, 0);
});

test('provider data is normalised and inaccessible/duplicate map entries are excluded', async () => {
  const api = server(async url => {
    if (url.includes('postcodes.io')) return json(postcode);
    if (url.includes('open-meteo')) return json({ current: { european_aqi: 25, pm2_5: 6, time: '2026-10-03T12:00' } });
    if (url.includes('carbonintensity')) {
      assert.match(url, /T\d{2}:\d{2}Z\/fw24h\/postcode\/E8$/);
      return json({ data: { data: [{ from: '2026-10-03T11:00Z', intensity: { forecast: 100, index: 'low' }, generationmix: [{ fuel: 'solar', perc: 20 }, { fuel: 'wind', perc: 30 }, { fuel: 'gas', perc: 50 }] }] } });
    }
    return json({ elements: [
      { type: 'way', id: 1, center: { lat: 51.546, lon: -0.056 }, tags: { name: 'Public park' } },
      { type: 'node', id: 2, lat: 51.546, lon: -0.056, tags: { name: 'Public park' } },
      { type: 'way', id: 3, center: { lat: 51.546, lon: -0.056 }, tags: { name: 'Private garden', access: 'private' } },
    ] });
  });
  const result = await api.getEnvironment('e8 1ea');
  assert.equal(result.demo, false);
  assert.equal(result.air.aqi, 25);
  assert.equal(result.electricity.renewables, 50);
  assert.equal(result.green.places.length, 1);
  assert.equal(result.green.places[0].name, 'Public park');
  assert.ok(result.green.places[0].distance > 0);
  assert.equal(result.errors.length, 0);
});

test('provider failure remains missing live data, never fabricated sample data', async () => {
  const api = server(async url => {
    if (url.includes('postcodes.io')) return json(postcode);
    if (url.includes('open-meteo')) return json({ current: { european_aqi: 32, pm2_5: 7, time: '2026-10-03T12:00' } });
    throw new Error('Provider offline');
  });
  const result = await api.getEnvironment('E8 1EA');
  assert.equal(result.air.aqi, 32);
  assert.equal(result.electricity, null);
  assert.equal(result.green, null);
  assert.equal(result.errors.length, 2);
  assert.equal(result.demo, false);
});

test('Overpass timeout remark is not presented as zero nearby green spaces', async () => {
  const api = server(async url => url.includes('postcodes.io') ? json(postcode) : json({ remark: 'runtime error: Query timed out', elements: [] }));
  const result = await api.getEnvironment('E8 1EA');
  assert.equal(result.green, null);
  assert.ok(result.errors.some(x => x.includes('green spaces')));
});
