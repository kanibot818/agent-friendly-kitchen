# Kitchen 視覺強化 v2（Issue #9）

給 Keroro／主廚審方向。**肉眼看不出 before/after = 不合格。**  
Preview 現況：https://kanibot818.github.io/agent-friendly-kitchen/  
對照失敗的 v1：`docs/visual-spec-v1.md`（只抽同臉 token）。

主色 `#2f6fed` **保留**。可動：中性色、字重、間距節奏、表面層、按鈕層級。  
OUT：新功能、插畫、大動畫、再交「畫面幾乎不變」的規格。

---

## 1. 現況醜點（5）

1. **層次扁平**：四張卡同寬、同 padding、同陰影、同標題重量 → 沒有主次，像四份表單堆疊，不是產品。
2. **節奏單一**：卡片間距與卡內間距都擠在同一檔；標題→內文→按鈕沒有「鬆／緊」呼吸，畫面像均等磚牆。
3. **對比不夠**：內文幾乎全是 primary 色；muted 幾乎沒用；次要按鈕是實心灰，跟主按鈕搶視線，分不出 Primary／Secondary。
4. **空白無用**：頁面只有置中一柱，沒有頁級標題／眉標當錨點；上下空白空洞，中間卻擠。
5. **對齊無結構**：每卡各自為政，沒有共用的「標題列／動作列」節奏；深色只換底，沒有 inset 表面，深度感弱。

---

## 2. 一眼看得出的改善意圖（before → after）

**意圖名：Settings Lab（分層設定台）**

| 維度 | Before（現況） | After（v2，主廚應一眼看出） |
|---|---|---|
| 頁面 | 懸空四卡 | 頂部 **頁眉**（eyebrow + 產品名）+ 下方卡片柱 |
| 主次 | 四卡同等 | **Hello 為主卡**（更大字、更厚 padding、左側 accent rail）；其餘為 **次卡**（較緊、較淡陰影） |
| 按鈕 | 兩顆實心色塊並排 | **Primary 實心** + **Secondary 描邊／ghost**（層級立刻分開） |
| 字色 | 幾乎全黑／全白 | 標題重、內文常、說明用 muted；label 用 caption |
| 表面 | page／card 兩層 | page → card → **inset input 坑** 三層；深色同樣三層 |
| 節奏 | 均等 gap | 卡間 **更大**（space-6）；卡內標題區鬆、動作列貼底緊 |

參考模式（概念，不抄 UI）：Linear／Vercel dashboard 的「頁眉 + 主面板 + 次面板」；設定頁常見 primary solid / secondary outline。

**主廚驗收一句話**：縮到手機、切深淺，還能立刻指出「哪張是主卡、哪顆是主按鈕」。

---

## 3. Token／規則（可實作，必須改臉）

### 3.1 Token（相對 v1 的可見變更）

#### Spacing（節奏拉開）

| Token | rem | 用途 |
|---|---|---|
| `--space-1` | 0.25 | 微調 |
| `--space-2` | 0.5 | label→control |
| `--space-3` | 0.75 | 欄位間、按鈕 gap |
| `--space-4` | 1 | 卡內段落 |
| `--space-5` | 1.5 | 次卡 padding |
| `--space-6` | 2 | **卡間 gap、頁眉下距** |
| `--space-7` | 2.5 | **主卡 padding**（新） |
| `--space-8` | 3 | shell 桌面外距（新） |

手機 shell：`--space-4`；卡間仍至少 `--space-5`。

#### Type（重量拉開）

| Token | size | weight | 用途 |
|---|---|---|---|
| `--text-display` | 1.75rem | 700 | 頁眉產品名（新） |
| `--text-title` | 1.625rem | 700 | 主卡 h1（略升） |
| `--text-heading` | 1.125rem | 650 | 次卡 h2（略降，讓主卡勝出） |
| `--text-body` | 1rem | 400 | 內文 |
| `--text-caption` | 0.8125rem | 500 | eyebrow／label／輔助；`letter-spacing: 0.04em` 用於 eyebrow |

#### Radius / shadow

| Token | Light | Dark |
|---|---|---|
| `--radius-card` | 1.25rem | 同 |
| `--radius-control` | 0.625rem | 同 |
| `--shadow-card` | `0 1px 2px rgba(0,0,0,.04), 0 12px 32px rgba(40,30,20,.08)` | `0 1px 0 rgba(255,255,255,.04), 0 16px 40px rgba(0,0,0,.45)` |
| `--shadow-card-muted` | `0 1px 2px rgba(0,0,0,.03)` | `0 1px 0 rgba(255,255,255,.03)` |

主卡用 `--shadow-card`；次卡用 `--shadow-card-muted`（**可見差**）。

#### Colors（中性／表面可動；accent 不動）

| Token | Light | Dark |
|---|---|---|
| `--bg-page` | `#e9e4d8`（比現況更深一階的暖紙） | `#101010` |
| `--bg-card` | `#fffcf7` | `#1c1c1c` |
| `--bg-card-muted` | `#f3eee4`（次卡可選；或同 bg-card + muted shadow） | `#161616` |
| `--bg-input` | `#f0ebe1`（**inset 坑**，別再跟 card 同白） | `#0e0e0e` |
| `--text-primary` | `#14120f` | `#f4f1ea` |
| `--text-muted` | `#6b6458` | `#9a958c` |
| `--border-subtle` | `#d2c8b4` | `#2e2e2e` |
| `--border-strong` | `#b9ad96`（主卡邊／rail 旁） | `#3f3f3f` |
| `--border-input` | `#c4b8a2` | `#3a3a3a` |
| `--accent` | `#2f6fed` | `#2f6fed` |
| `--accent-secondary` | 刪實心用途 → secondary 改走 ghost |
| `--accent-success` | `#1f7a3f` | `#3d9b5c` |
| `--accent-pressed` | `#5b4fd6` | `#5b4fd6` |
| `--on-accent` | `#fff` | `#fff` |
| `--btn-secondary-bg` | `transparent` | `transparent` |
| `--btn-secondary-border` | `--border-strong` | `#5a5a5a` |
| `--btn-secondary-text` | `--text-primary` | `--text-primary` |

### 3.2 元件規則

#### Layout / 頁眉
1. `AppShell` 內、`main` **上方**加頁眉塊（純視覺，無新功能）：eyebrow `KITCHEN`（caption + tracking）+ 標題 `Agent Friendly`（`--text-display`）。
2. `main`：`width: min(32rem, 100%)`；`gap: var(--space-6)`。
3. 頁眉到第一卡：`margin-bottom: var(--space-6)`。

#### Card
1. 保留共用 `.card`；加修飾：**`.card-hero`**（Hello）與預設次卡。
2. Hero：`padding: var(--space-7)`；`border-color: var(--border-strong)`；`box-shadow: var(--shadow-card)`；左側 `box-shadow` 或 `border-left: 3px solid var(--accent)`（rail）。
3. 次卡：`padding: var(--space-5)`；`box-shadow: var(--shadow-card-muted)`；標題用 `--text-heading`。
4. 卡內：標題下距 `--space-4`；動作列 `margin-top: var(--space-5)`；說明段落用 `color: var(--text-muted)`（View 給 class 或 `p` 預設 muted、強調句另加 `.text-strong`——以少改 JSX 為原則：預設 body primary，第二行說明加 class `text-muted`）。

#### Button
1. `.btn-primary`：實心 `--accent`（不變）。
2. `.btn-secondary`：**必須改臉** → ghost：透明底、`1.5px solid var(--btn-secondary-border)`、文字 `--btn-secondary-text`；hover 輕填 `--bg-input`。
3. pressed／success 維持語意色實心（settings on、theme pressed）。
4. `min-height: 2.75rem`；列上 wrap。

#### Input
1. 背景必須是 `--bg-input`（與 card 明顯不同 = inset）。
2. label：`--text-caption` + `--text-muted`。
3. focus ring 維持 accent。

### 3.3 Do / Don’t

**Do**
1. 主卡／次卡、實心／ghost、page／card／input 三層 —— 三組對比都要在截圖裡看得見。
2. 深淺各截桌面 + ~390 寬；主廚應能指出主卡與主按鈕。
3. 先改 token 臉再改 class；**這樣才好看。**

**Don’t**
1. 不准再只把舊 hex 搬進 `var(--…)` 卻畫面不變。
2. 不准次要按鈕繼續實心灰搶主色。
3. 不准加漸層英雄區、插畫、動效大作；不准換掉 `#2f6fed`。

### 3.4 Acceptance（可見）

- [ ] 頁眉存在，且與卡片柱有明顯層級。
- [ ] Hello 主卡 vs 其他卡：padding／陰影／rail 至少兩項可見差異。
- [ ] Primary vs Secondary 按鈕形態不同（實心 vs ghost）。
- [ ] Input 坑與卡片表面不同色。
- [ ] Light／Dark 都成立；手機不橫溢、可點。
- [ ] `./bin/verify` + CI quality 綠（實作階段）。

---

## 4. 給工程的 handoff 線（方向通過後）

路徑：`docs/visual-spec-v2.md`  
Top 3：① 頁眉 + 主卡 rail ② secondary → ghost ③ page／card／input 三層中性色  
OUT：新功能、換主色、插畫動畫、同臉 token。

——日向夏美  
看不出差就重做一版。別偷懶。
