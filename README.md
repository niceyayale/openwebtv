# OpenWebTV — Content Source Repository

>   English |**[中文](README.zh.md)**

> This repository collects TVBox-format JSON config files for [OpenWebTV](https://openwebtv.com), an online video player platform.

## About OpenWebTV

OpenWebTV is a pure online player — **zero built-in sources**. All content comes from the internet. Users import source config files manually.

- **Website**: https://openwebtv.com
- **Principle**: 0 promotion · 0 bundled config · data from the public internet

## Available Sources

Sources are ordered by playback type: **direct-play first**, parser-based (Spider) last.

---

### 1. CMS Direct-Play Sources (No JAR needed)

These sources stream video directly via CMS API — no Spider JAR required, fastest playback.

**Config file**: [`configs/quick-cms-sources.json`](configs/quick-cms-sources.json) — 2 CMS sources

| Source | API | Type |
|--------|-----|------|
| HHZY 4K | `https://hhzyapi.com/api.php/provide/vod/` | CMS (type=1) |
| 1080ZYKU | `https://api.1080zyku.com/inc/api_mac10.php` | CMS (type=1) |

**Import URL**:
```
https://raw.githubusercontent.com/niceyayale/openwebtv/main/configs/quick-cms-sources.json
```

> You can also paste a CMS API URL directly (e.g. `https://hhzyapi.com/api.php/provide/vod/`). The player will auto-detect it and wrap it as a single source. If the direct fetch is blocked by CORS, a proxy fallback is used automatically.

---

### 2. Curated 13 Spider Sources (Verified)

A verified set of Spider sources supporting search → detail → play → resume.

- **Config file**: [`configs/curated.json`](configs/curated.json)
- **Source count**: 13 Spider sources (type=3)
- **JAR**: `https://raw.githubusercontent.com/qist/tvbox/master/xiaosa/spider.jar`
- **Status**: Verified — searchable & playable

**Import URL**:
```
https://raw.githubusercontent.com/niceyayale/openwebtv/main/configs/curated.json
```

---

### 3. xiaosa 76 Spider Sources

Community-maintained Spider source collection (same JAR as above).

**Import URL**:
```
https://raw.githubusercontent.com/qist/tvbox/master/xiaosa/api.json
```

---

## Import Guide

### Method 1: URL Import

1. Open [OpenWebTV](https://openwebtv.com)
2. Click **Add Content Source**
3. Paste any import URL from above
4. Click **Import**

> GitHub blob URLs (e.g. `github.com/.../blob/...`) are auto-converted to raw URLs. You can use either format.

### Method 2: File Upload

1. Download a JSON config file from this repo (e.g. `configs/curated.json`)
2. Open OpenWebTV → **Add Content Source**
3. Click **Upload JSON File**
4. Select the downloaded file

### Method 3: Single CMS API URL

Paste a CMS API endpoint directly in the URL input box. The player auto-detects CMS API responses and wraps them as a single source.

## Config Sources

Tested and verified config URLs that work with OpenWebTV. Paste any of these into the "Add Content Source" dialog.

**Config file**: [`configs/config-sources.json`](configs/config-sources.json)

| Source | URL | Format | Sites | Notes |
|--------|-----|--------|-------|-------|
| 饭太硬导航 | `http://www.饭太硬.cc/tv/` | HTML→auto-follow | 47 | HTML page with multiple config links; auto-extracts and follows to working config |
| 饭太硬/gitlink | `https://cdn09022024.gitlink.org.cn/api/v1/repos/xxooo/in/raw/in.bmp` | JPEG steganography | 47 | Direct config URL (embedded in JPEG) |
| yoursmile66 | `https://raw.githubusercontent.com/yoursmile66/TVBox/refs/heads/main/XC.json` | AES-CBC encrypted | 84 | Encrypted config (auto-decrypted) |

### Supported Config Formats

OpenWebTV is fully compatible with TVBox config formats:

- **Plain JSON** — direct parse
- **JSON with comments** — `//` and `/* */` stripped
- **Base64 marked** — `[A-Za-z0-9]{8}**` prefix → base64 decode
- **JPEG steganography** — config embedded after JPEG FFD9 marker
- **AES-CBC encrypted** — hex content starting with `2423` (auto-decrypted)
- **AES-ECB encrypted** — URL with `;pk;password` key (auto-decrypted)
- **HTML navigation pages** — auto-extracts `data-clipboard-text` URLs and follows them

## Disclaimer

- This repo only collects publicly available TVBox config files from the internet
- OpenWebTV does not provide, store, or cache any video content
- All sources are from third-party public internet resources
- Users are responsible for evaluating source legality and safety
- For takedown requests: contact@openwebtv.com

## Contact

- **Email**: contact@openwebtv.com
- **GitHub**: https://github.com/niceyayale/openwebtv

## Contributing

Pull requests welcome. Please ensure:

1. Source URLs are publicly accessible
2. JSON format follows TVBox spec
3. Update source info in both README.md and README.zh.md

## License

Config files in this repo are from public internet resources, for educational and research use only.
