# Kitchen 視覺整理 v1（Issue #7）

給 Kururu 直接實作。短規範，不是論文。**別偷懶。**

Preview: https://kanibot818.github.io/agent-friendly-kitchen/  
現況問題：`src/styles.css` 四個 feature 卡片／按鈕樣式複製貼上；數值零散（0.35／0.55／0.6／0.75…）；沒有 CSS variables；深色只蓋了 page／card／input。

範圍 **IN**：間距、字級、卡片／按鈕／輸入、深淺一致、手機可讀。  
範圍 **OUT**：不加功能、不大改品牌色、不做插畫動畫。

---

## 1. Token 表

放到 `:root`（與 `[data-theme="light"]` 同值），深色用 `html[data-theme="dark"]` 覆寫。實作時用 `var(--…)`，禁止再在各 feature 硬編 hex／rem。

### Spacing（唯一允許的間距）

| Token | rem | px@16 | 用途 |
|---|---|---|---|
| `--space-1` | 0.25 | 4 | 微調 |
| `--space-2` | 0.5 | 8 | label→input、行內小距 |
| `--space-3` | 0.75 | 12 | 按鈕 gap、欄位間 |
| `--space-4` | 1 | 16 | 段落、區塊內 |
| `--space-5` | 1.5 | 24 | 卡片 padding、卡片外距 |
| `--space-6` | 2 | 32 | shell 外 padding（桌面） |

手機（`max-width: 480px`）：shell 用 `--space-4`，卡片間距仍 `--space-5`。

### Type

| Token | size | weight | line-height | 用途 |
|---|---|---|---|---|
| `--text-title` | 1.5rem | 700 | 1.25 | 頁內主標（hello h1） |
| `--text-heading` | 1.25rem | 650 | 1.3 | 區塊標題（h2） |
| `--text-body` | 1rem | 400 | 1.5 | 內文 |
| `--text-caption` | 0.875rem | 400 | 1.4 | 輔助說明、成功提示可升 weight |

字體維持：`"Segoe UI", system-ui, sans-serif`（不換字族）。

### Radius / shadow

| Token | 值 |
|---|---|
| `--radius-card` | 1rem |
| `--radius-control` | 0.5rem |
| `--shadow-card` light | `0 8px 24px rgba(0,0,0,0.06)` |
| `--shadow-card` dark | `0 8px 24px rgba(0,0,0,0.35)` |

### Colors（保留品牌主色，只整理語意）

| Token | Light | Dark |
|---|---|---|
| `--bg-page` | `#f6f4ef` | `#1a1a1a` |
| `--bg-card` | `#ffffff` | `#252525` |
| `--bg-input` | `#ffffff` | `#1f1f1f` |
| `--text-primary` | `#1a1a1a` | `#f2f2f2` |
| `--text-muted` | `#5f6b7a` | `#a8b0bc` |
| `--border-subtle` | `#ddd5c6` | `#3a3a3a` |
| `--border-input` | `#cfc6b6` | `#4a4a4a` |
| `--accent` | `#2f6fed` | `#2f6fed`（不變） |
| `--accent-secondary` | `#5f6b7a` | `#5f6b7a` |
| `--accent-success` | `#1f7a3f` | `#3d9b5c`（深色略提亮可讀） |
| `--accent-pressed` | `#5b4fd6` | `#5b4fd6`（theme pressed，保留） |
| `--on-accent` | `#ffffff` | `#ffffff` |

Focus ring（鍵盤）：`outline: 2px solid var(--accent); outline-offset: 2px;` 深淺同用。

---

## 2. 元件規則

### Layout / shell
1. `.app-shell`：置中；padding `--space-6`（手機 `--space-4`）。
2. `main`：直向 stack；子卡片寬 `min(28rem, 100%)`；卡片間距 `--space-5`（拿掉各自 `margin-top` 硬編，改 gap）。
3. 動作列 `.…-actions`：`flex-wrap: wrap`；`gap: var(--space-3)`。

### Card（hello / user-profile / settings-toggle / theme-toggle 共用）
1. 抽共用 class（建議 `.card`），四個 section 套用，刪四份重複規則。
2. `background: var(--bg-card)`；`border: 1px solid var(--border-subtle)`；`border-radius: var(--radius-card)`；`padding: var(--space-5)`；`box-shadow: var(--shadow-card)`；`color: var(--text-primary)`。
3. 標題 margin：`0 0 var(--space-3)`；內文段落 margin 垂直用 `--space-2`。
4. 深色只靠 token，禁止再寫一長串 `html[data-theme="dark"] .hello, …` 選擇器清單（除非過渡期暫存）。

### Button
1. 共用 `.btn` + 變體：`.btn-primary`（`--accent`）、`.btn-secondary`（`--accent-secondary`）、`.btn-success`／`[aria-pressed="true"]` 用既有語意色（settings→success、theme→pressed，**色值不新發明**）。
2. padding：`0.625rem 1rem`（對齊 scale：垂直≈`--space-2`+微調，水平 `--space-4`）；`min-height: 2.75rem`（44px 可點）；`border-radius: var(--radius-control)`；`font: inherit`；`border: 0`；文字 `--on-accent`。
3. hover：`filter: brightness(1.05)` 可留；disabled 若無需求先不做。
4. 同一列多顆按鈕寬度跟內容走，不要強制等寬；窄屏靠 wrap。

### Input
1. 共用欄位：label 與 input `gap: var(--space-2)`；欄位之間 `margin-bottom: var(--space-3)`。
2. input：`border: 1px solid var(--border-input)`；`background: var(--bg-input)`；`color: var(--text-primary)`；`border-radius: var(--radius-control)`；`padding: 0.625rem 0.75rem`；`min-height: 2.75rem`；`width: 100%`。
3. placeholder／輔助字用 `--text-muted`（若有）。
4. 成功文案：`--accent-success` + weight 600；字級可用 `--text-caption` 或 body，二擇一全站統一。

---

## 3. Do / Don’t

### Do
1. 先建 token，再改 class；四張卡同一套 `.card`／`.btn`／field。
2. 深淺切換只換 token；對照 light／dark 各截一張手機寬（≤390）驗可點、不橫向溢出。
3. 保留 `#2f6fed` 與暖紙底 `#f6f4ef` 調性——**這樣才好看。**

### Don’t
1. 不要在單一 feature 再寫一份獨立 button／card 色碼。
2. 不要為了「好看」換新主色、加漸層、陰影堆疊、動畫、插畫。
3. 不要用小於 `--space-2` 的隨意 rem，或把字縮到 `<0.875rem` 硬塞手機。

---

## 4. Kururu 實作順序（建議）

1. 在 `styles.css` 頂部建 token（light + dark）。
2. 抽 `.card`／`.btn*`／field／input；改四個 View 的 className（或暫時用多 selector 指向同一規則）。
3. shell gap + 手機 padding media query。
4. `./bin/verify` + 手動切 theme、縮到 ~390 寬。
5. PR 描述短寫：改了什麼、綠燈、請主廚對 Preview。

驗收對齊 Issue #7：verify／CI 綠、Pages before/after、深淺整齊、手機可點。

——日向夏美  
不行就重做一版。
