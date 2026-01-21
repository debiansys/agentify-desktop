const DEFAULT_CHROME_VERSION = '120.0.0.0';

function normalizeChromeVersion(chromeVersion) {
  if (typeof chromeVersion === 'string' && chromeVersion.trim()) {
    return chromeVersion.trim();
  }
  return DEFAULT_CHROME_VERSION;
}

function chromeMajorVersion(chromeVersion) {
  const version = normalizeChromeVersion(chromeVersion);
  const major = version.split('.')[0];
  return major || DEFAULT_CHROME_VERSION.split('.')[0];
}

function platformToken(platform) {
  if (platform === 'darwin') return 'Macintosh; Intel Mac OS X 10_15_7';
  if (platform === 'win32') return 'Windows NT 10.0; Win64; x64';
  return 'X11; Linux x86_64';
}

function platformClientHint(platform) {
  if (platform === 'darwin') return 'macOS';
  if (platform === 'win32') return 'Windows';
  return 'Linux';
}

export function buildChromeUserAgent({ platform = process.platform, chromeVersion = process.versions?.chrome } = {}) {
  const version = normalizeChromeVersion(chromeVersion);
  return `Mozilla/5.0 (${platformToken(platform)}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${version} Safari/537.36`;
}

export function buildChromeClientHints({ platform = process.platform, chromeVersion = process.versions?.chrome } = {}) {
  const major = chromeMajorVersion(chromeVersion);
  return {
    'sec-ch-ua': `"Not A(Brand";v="99", "Google Chrome";v="${major}", "Chromium";v="${major}"`,
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': `"${platformClientHint(platform)}"`
  };
}
