# Kitchen 視覺 v3：de-AI-face（Lab Console）

Issue 接續 #9；v1 token-only、v2 Settings Lab 暖紙等卡牆均不合格。  
Preview：https://kanibot818.github.io/agent-friendly-kitchen/  
本檔給 Keroro 驗收方向；**通過前勿開工**。

---

## 1. Design read

Reading this as: **agent-friendly demo kitchen（工程／Bot 演練殼）for 技術觀眾**, with a **lab-console / Primer-adjacent** language, leaning toward **cool zinc surfaces + hairline sections + mono chrome**（不是 Settings Lab、不是暖紙 SaaS kit）.

Dials（產品殼，非 landing）：`VARIANCE 4 / MOTION 2 / DENSITY 6`.

---

## 2. 現況弱點 + 仍中的 AI tells

**弱**
1. 四塊等權重面板，沒有「工作台」結構，不像廚房／實驗室。
2. 頁面人格停在「通用設定頁」，與 *agent-friendly kitchen* 題材脫節。
3. 深淺只換底色，結構仍是同一張卡牆。

**仍中的硬禁 tells（打回理由）**
- 暖奶油紙底（`--bg-page: #e9e4d8` 一族）
- SaaS **等卡牆**：同圓角、同軟陰影、同 padding 堆疊
- Settings Lab 臉：tracked eyebrow 頁眉 + 主卡 rail + ghost 鈕仍貼在奶油卡上
- 全站同一大 radius + soft shadow（card kit 簽名）

---

## 3. Visible intent（一眼差）+ **一個 bold move**

### Bold move（只砸這一處）
**拆掉卡片牆 → Lab Console：頂部工具 chrome + 直式 hairline 分節，零卡片陰影。**

| Before (v2) | After (v3) |
|---|---|
| 暖紙頁 + 四張浮起圓角卡 | **冷 zinc 頁** + **頂 chrome 條** + 內容區 **用 1px 分隔的 section**，不浮起 |
| 主卡加粗、次卡略瘦（仍是卡） | **沒有 `.card` 盒模型當預設**；section 左對齊、全寬欄 |
| Segoe + 奶油對比 | **Plex Sans + Plex Mono**（chrome／狀態用 mono） |
| 陰影說話 | **邊框說話**；shadow token 預設 `none` |

一眼測試：縮圖也應看出「上面一條工具列、下面像文件／控制台分節」，而不是「四張奶油名片」。

參考（概念）：GitHub Primer settings 的 chrome + 分節；VS Code 淺色殼的冷灰工作面。不抄元件庫，只借結構。

ASCII：
```
+==========================================+
| Kitchen          agent demo shell   [◐]  |  <- chrome 40–48px, zinc, mono meta
+------------------------------------------+
| Hello                                    |  <- section, border-b only
|  body…                    [primary][ghost]|
+------------------------------------------+
| Profile                                  |
|  fields…                                 |
+------------------------------------------+
| Settings / Theme …                       |
+------------------------------------------+
```

---

## 4. Token 表（改臉，不是搬家）

### Color（4–6 核心；**禁奶油紙**）

| Token | Light | Dark | 相對 v2 |
|---|---|---|---|
| `--bg-page` | `#f4f4f5` (zinc-100) | `#18181b` (zinc-900) | 離暖紙 |
| `--bg-chrome` | `#e4e4e7` | `#27272a` | **新** |
| `--bg-surface` | `#ffffff` | `#09090b` | 內容帶；可與 page 同層只用 border |
| `--bg-input` | `#fafafa` | `#27272a` | 冷灰坑，非暖 inset |
| `--text-primary` | `#18181b` | `#fafafa` | 冷近黑，非 espresso |
| `--text-muted` | `#71717a` | `#a1a1aa` | |
| `--border` | `#d4d4d8` | `#3f3f46` | 唯一邊框語意 |
| `--accent` | `#2f6fed` | `#2f6fed` | **保留**（既有品牌，非新紫） |
| `--accent-success` | `#15803d` | `#4ade80` | |
| `--accent-pressed` | `#5b4fd6` | `#5b4fd6` | theme pressed 保留 |
| `--on-accent` | `#fff` | `#fff` | |

刪：`--bg-card` 浮起語意、`--shadow-card*`、暖 `--border-subtle` 木色系。

### Type

| Role | Stack | Size / weight |
|---|---|---|
| UI | `"IBM Plex Sans", system-ui, sans-serif` | body 1rem/400；section title 1.125rem/600 |
| Chrome / 狀態 | `"IBM Plex Mono", ui-monospace, monospace` | 0.75–0.8125rem/500；**sentence case**，禁止 tracked ALL-CAPS eyebrow |
| 頁名（chrome 左） | Plex Sans | 0.9375rem/600 |

字體：`@fontsource/ibm-plex-sans` + `ibm-plex-mono`（或等价 self-host）。**不用** Segoe 當個性、不用 Fraunces／Inter 當招牌。

### Spacing / radius / shadow

| Token | 值 | 用途 |
|---|---|---|
| `--space-1…5` | 4／8／12／16／24 px | 密一點（density 6） |
| `--space-section` | 28–32 px | section 內上下 |
| `--chrome-h` | 2.75rem | 頂列高 |
| `--radius` | **0.25rem**（全站唯一；控制項同） | 反卡 kit 大圓角 |
| `--shadow` | **none** | 硬規則 |

---

## 5. 元件規則

### Layout
1. 全頁：`bg-page`；頂 **`.chrome`** 橫條（`bg-chrome` + 底 `1px solid var(--border)`），內左產品名、右可放既有 theme 控制的視覺錨（不改功能邏輯）。
2. **`main` 改左對齊**，`width: min(40rem, 100%)`，`margin: 0 auto`；**禁止**垂直置中 mag 浮卡。
3. 每個 feature = **`.section`**：`padding: var(--space-section) 0`；`border-bottom: 1px solid var(--border)`；最後一節無底線。
4. **刪除／停用** `.card` / `.card-hero` 浮起樣式（class 可留空殼但視覺等於 section）。

### Section（取代 card）
1. 標題列：title（Sans 600）+ 可選一行 muted 說明；**不要** ALL-CAPS eyebrow、不要 `·` meta 串。
2. 內容與動作列 `gap` 用 space-3／4；動作列 wrap。
3. 不準左側 accent rail（那是 v2 簽名）。

### Button
1. Primary：實心 accent；radius `--radius`；min-height 2.5rem。
2. Secondary：**ghost**（透明 + `1px solid var(--border)` + primary 文字）；**禁止**實心灰次鈕。
3. pressed／success：語意實心；形狀與 primary 同 radius。

### Input
1. 全寬；`bg-input`；`1px solid var(--border)`；radius `--radius`；label 在上、caption 色 muted（sentence case）。
2. Focus：`outline: 2px solid var(--accent); outline-offset: 2px`。

---

## 6. Do / Don’t

**Do**
1. 先讓「chrome + hairline sections」在截圖成立，再微調色。
2. 深淺都維持 **冷 zinc 家族**（不混回暖紙）。
3. 實作後跑 [web-design-guidelines](sand-workflow:web-design-guidelines) 掃 `styles.css` + shell markup。

**Don’t**
1. **不要**暖奶油紙、等卡牆、大圓角軟陰影、Settings Lab 頁眉／rail。
2. **不要** tracked ALL-CAPS eyebrow、中點 meta 串、裝飾 `→`。
3. **不要**只把 v2 hex 改名成 zinc 卻保留四張浮卡（= 同臉）。

---

## 7. Acceptance

- [ ] 一眼：頂 chrome + 分節文件感；**不是**四張浮卡。
- [ ] 背景／中性色屬 **cool zinc**，不像 warm-paper SaaS kit。
- [ ] Light + dark 同一結構；手機寬可讀可點、無橫向溢出。
- [ ] 主色仍 `#2f6fed`；無新功能、無插畫／大動畫。
- [ ] Anti-slop checked（frontend-design + design-taste bans）。
- [ ] 實作階段：`./bin/verify` + CI quality 綠；Pages before/after 肉眼有差。

---

## Handoff（僅 Keroro 通過後）

`docs/visual-spec-v3.md`  
Top 3：① 拆卡牆→hairline sections ② 頂部 lab chrome ③ 冷 zinc + Plex（禁奶油紙）  
OUT：新功能、換掉 `#2f6fed`、插畫動畫、再交同臉 token  
**anti-slop checked.** 先驗收，勿叫 Kururu。

——日向夏美  
還是同一張臉就重做一版。別偷懶。這樣才好看。
