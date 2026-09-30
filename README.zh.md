# OpenWebTV — 内容源仓库

> 中文 | **[English](README.md)**

> 本仓库是 [OpenWebTV](https://openwebtv.com) 的内容源收集仓库，提供 TVBox 格式的 JSON 配置文件，供用户手动导入使用。

## 关于 OpenWebTV

OpenWebTV 是一个纯在线播放平台，**不内置任何内容源**，所有数据均来自互联网。用户需自行获取源配置文件并导入。

- **网站**: https://openwebtv.com
- **原则**: 0 推广 · 0 内置配置 · 数据来源互联网

## 可用内容源

按播放方式排序：**直连播放优先**，需解析（Spider）的放后面。

---

### 1. CMS 直连源（无需 JAR）

通过 CMS API 直接播放，无需 Spider JAR，播放速度最快。

**配置文件**: [`configs/quick-cms-sources.json`](configs/quick-cms-sources.json) — 2 个 CMS 源

| 源 | API | 类型 |
|----|-----|------|
| HHZY 4K | `https://hhzyapi.com/api.php/provide/vod/` | CMS (type=1) |
| 1080ZYKU | `https://api.1080zyku.com/inc/api_mac10.php` | CMS (type=1) |

**导入链接**:
```
https://raw.githubusercontent.com/niceyayale/openwebtv/main/configs/quick-cms-sources.json
```

> 也可以直接粘贴 CMS API 地址（如 `https://hhzyapi.com/api.php/provide/vod/`），播放器会自动识别并包装为单个源。如果直连被 CORS 拦截，会自动通过代理重试。

---

### 2. 精选 13 源（已验证）

经过完整 E2E 验证的 Spider 源集合，支持搜索 → 详情 → 播放 → 续传全流程。

- **配置文件**: [`configs/curated.json`](configs/curated.json)
- **源数量**: 13 个 Spider 源（type=3）
- **JAR**: `https://raw.githubusercontent.com/qist/tvbox/master/xiaosa/spider.jar`
- **状态**: 已验证可搜索、可播放

**导入链接**:
```
https://raw.githubusercontent.com/niceyayale/openwebtv/main/configs/curated.json
```

---

### 3. xiaosa 76 源

社区维护的 Spider 源集合，JAR 与精选 13 源相同。

**导入链接**:
```
https://raw.githubusercontent.com/qist/tvbox/master/xiaosa/api.json
```

---

## 导入教程

### 方式一：URL 导入

1. 打开 [OpenWebTV](https://openwebtv.com)
2. 点击「添加内容源」
3. 粘贴上方任一导入链接
4. 点击「导入」

> GitHub blob 链接（如 `github.com/.../blob/...`）会自动转换为 raw 链接，两种格式均可使用。

### 方式二：文件上传

1. 下载本仓库中的 JSON 配置文件（如 `configs/curated.json`）
2. 打开 OpenWebTV →「添加内容源」
3. 点击「上传 JSON 文件」
4. 选择下载的文件

### 方式三：单个 CMS API 地址

在 URL 输入框中直接粘贴 CMS API 地址，播放器会自动识别 CMS API 响应并包装为单个源。

## 配置源

已测试验证可用的 TVBox 配置 URL，粘贴到「添加内容源」对话框即可导入。

**配置文件**: [`configs/config-sources.json`](configs/config-sources.json)

| 源 | URL | 格式 | 站点数 | 说明 |
|----|-----|------|--------|------|
| 饭太硬导航 | `http://www.饭太硬.cc/tv/` | HTML→自动跟随 | 47 | HTML 页面含多个配置链接，自动提取并跟随到可用配置 |
| 饭太硬/gitlink | `https://cdn09022024.gitlink.org.cn/api/v1/repos/xxooo/in/raw/in.bmp` | JPEG 隐写 | 47 | 直接配置 URL（嵌入在 JPEG 中） |
| yoursmile66 | `https://raw.githubusercontent.com/yoursmile66/TVBox/refs/heads/main/XC.json` | AES-CBC 加密 | 84 | 加密配置（自动解密） |

### 支持的配置格式

OpenWebTV 完全兼容 TVBox 配置格式：

- **明文 JSON** — 直接解析
- **带注释 JSON** — 去除 `//` 和 `/* */`
- **Base64 标记** — `[A-Za-z0-9]{8}**` 前缀 → base64 解码
- **JPEG 隐写** — 配置嵌入在 JPEG FFD9 标记之后
- **AES-CBC 加密** — hex 内容以 `2423` 开头（自动解密）
- **AES-ECB 加密** — URL 含 `;pk;password` 密钥（自动解密）
- **HTML 导航页** — 自动提取 `data-clipboard-text` URL 并跟随

## 免责声明

- 本仓库仅收集和整理互联网上公开可用的 TVBox 配置文件
- OpenWebTV 不提供、不存储、不缓存任何视频内容
- 所有内容源均来自第三方互联网公开资源
- 用户需自行判断内容源的合法性和安全性
- 如有侵权请联系 contact@openwebtv.com 删除

## 联系我们

- **邮箱**: contact@openwebtv.com
- **GitHub**: https://github.com/niceyayale/openwebtv

## 贡献

欢迎提交 Pull Request 添加新的内容源配置文件。请确保：

1. 源链接公开可访问
2. JSON 格式符合 TVBox 规范
3. 同时更新 README.md 和 README.zh.md 中的源信息

## License

本仓库的配置文件来自互联网公开资源，仅供学习和研究使用。
