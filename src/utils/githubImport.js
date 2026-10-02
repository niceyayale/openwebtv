import { fetchConfigFromUrl, parseConfig } from '../runtime/configParser.js';

const GITHUB_RAW = 'https://raw.githubusercontent.com/niceyayale/openwebtv/main';
const PROXY_URL = 'https://api.openwebtv.com/config?url=';

// Config files in the repo that are directly importable TVBox configs
const REPO_CONFIG_FILES = [
  `${GITHUB_RAW}/configs/curated.json`,
  `${GITHUB_RAW}/configs/quick-cms-sources.json`,
];

// Metadata file listing external TVBox config URLs
const CONFIG_SOURCES_URL = `${GITHUB_RAW}/configs/config-sources.json`;

/**
 * Simple JSON fetch with proxy fallback.
 * Bypasses fetchConfigFromUrl's TVBox-specific parsing (base64/AES/HTML).
 */
async function fetchJsonWithProxy(url, timeoutMs = 10000) {
  // Try direct fetch first
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const resp = await fetch(url, {
        headers: { Accept: 'application/json, text/plain, */*' },
        signal: controller.signal,
      });
      if (resp.ok) return await resp.text();
    } finally { clearTimeout(timer); }
  } catch (e) { /* fall through to proxy */ }

  // Proxy fallback
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(PROXY_URL + encodeURIComponent(url), {
      headers: { Accept: 'application/json, text/plain, */*' },
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error('Proxy HTTP ' + resp.status);
    return await resp.text();
  } finally { clearTimeout(timer); }
}

/**
 * One-click import: fetch all configs from GitHub repo via CORS proxy,
 * parse each, and merge into the store.
 *
 * @param {Function} mergeConfig - store merge function
 * @param {Function} onProgress - callback({ done, total, url, ok, count, error })
 * @returns {Promise<{ success: number, failed: number, total: number, errors: string[] }>}
 */
export async function importAllFromGitHub(mergeConfig, onProgress) {
  const results = { success: 0, failed: 0, total: 0, errors: [] };

  // Step 1: Collect all URLs to import
  const urls = [...REPO_CONFIG_FILES];

  // Fetch config-sources.json for external URLs (use simple fetch, not TVBox parser)
  try {
    const raw = await fetchJsonWithProxy(CONFIG_SOURCES_URL);
    const meta = JSON.parse(raw);
    if (meta.sources && Array.isArray(meta.sources)) {
      meta.sources.forEach(s => { if (s.url) urls.push(s.url); });
    }
  } catch (e) {
    results.errors.push(`Source list fetch failed: ${e.message}`);
  }

  results.total = urls.length;

  // Step 2: Import each URL sequentially
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    onProgress?.({ done: i, total: urls.length, url });
    try {
      const raw = await fetchConfigFromUrl(url);
      const parsed = parseConfig(raw, url);
      mergeConfig(parsed);
      results.success++;
      onProgress?.({
        done: i + 1, total: urls.length, url, ok: true,
        count: parsed._meta?.siteCount || 0,
      });
    } catch (e) {
      results.failed++;
      results.errors.push(`${url}: ${e.message}`);
      onProgress?.({
        done: i + 1, total: urls.length, url, ok: false, error: e.message,
      });
    }
  }

  return results;
}
