import test from 'node:test';
import assert from 'node:assert/strict';

import { buildChromeClientHints, buildChromeUserAgent } from '../browser-identity.mjs';

test('browser-identity: buildChromeUserAgent mirrors chrome + platform', () => {
  const ua = buildChromeUserAgent({ platform: 'win32', chromeVersion: '123.45.6.7' });
  assert.ok(ua.includes('Windows NT 10.0; Win64; x64'));
  assert.ok(ua.includes('Chrome/123.45.6.7'));
});

test('browser-identity: buildChromeClientHints sets chrome major version', () => {
  const hints = buildChromeClientHints({ platform: 'darwin', chromeVersion: '124.0.1.2' });
  assert.equal(hints['sec-ch-ua-mobile'], '?0');
  assert.equal(hints['sec-ch-ua-platform'], '"macOS"');
  assert.ok(hints['sec-ch-ua'].includes('v="124"'));
});
