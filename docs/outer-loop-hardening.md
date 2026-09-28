# Issue #11 — 外環加固 v1

> PM 規格（Dororo）。Kururu 依此改範本／文件並開 PR。  
> Issue：https://github.com/kanibot818/agent-friendly-kitchen/issues/11

## Problem

外環能跑，但不可重複相信：範本缺 IN／OUT／風險；開工與自審靠口頭，容易放水（「差不多」）。

## IN

1. **Feature／Bug 範本**（`.github/ISSUE_TEMPLATE/feature.yml`、`bug.yml`）欄位改為：
   - **Why**（必填）— 為什麼要做／為什麼是 bug
   - **IN**（必填）— 具體要做／要修的行為或表面
   - **OUT**（必填）— 明確不做什麼（至少兩點；Bug 可寫「不順便重構／不擴 scope」）
   - **Acceptance**（必填）— 可勾選、可證偽的驗收
   - **Risks／Notes**（選填）— 滑移／破壞點；已知 owner
   - Feature 可保留短「做什麼」或併入 IN；Bug「預期 vs 實際」併入 Why 或 IN 其一，勿重複三欄同義
2. **OUTER_LOOP.md** 擴成可執行手冊（順序固定）：
   老闆開單 → `Issue #N 開工` → 小隊 → Keroro 自審 → 短 handoff → 合／不合  
   產品功能 PR **不合入 main**，除非老闆說合。
3. **開工 checklist**（寫進 OUTER_LOOP 或 `docs/start-checklist.md`，給小隊）：見下方正文。
4. **自審 checklist**（寫進 OUTER_LOOP 或 `docs/self-review.md`，給 Keroro）：見下方正文；明確 **「差不多＝不過」**。
5. **老闆短 handoff 四段式**（寫進 OUTER_LOOP／自審文件）：見下方正文。
6. 必要時 `AGENTS.md` 加一行 pointer 到外環文件（`OUTER_LOOP.md`／本規格實作結果）。

### 開工 checklist（小隊）

- [ ] 讀完本 Issue（Why／IN／OUT／Acceptance）
- [ ] 讀 `AGENTS.md`、`FEATURE_MAP.md`、相關 spec
- [ ] 範圍已鎖：OUT 未偷加；Acceptance 未改口前不開做
- [ ] 已寫／確認 verify 計畫（改哪、怎麼證；視覺／行為若有則含一眼驗）
- [ ] 開工前已知阻斷點（權限、依賴、老闆決策）→ 先升級，不硬做

### 自審 checklist（Keroro）

規則：**差不多＝不過**。Fail → 具體 redo 點退回；Pass → 才寫短 handoff。

- [ ] 對齊 Acceptance：每一項可勾或可指出證據；不可「方向對了」
- [ ] **一眼可見／行為**：UI／文案／流程有差時，打開預覽或路徑，肉眼／操作能看出對齊；看不出差＝不過
- [ ] `./bin/verify`（或同等）綠；CI 綠（或已說明為何本 PR 僅 docs／yml 仍跑過）
- [ ] PR／交付未越 OUT；無自動 merge、無未請示擴 scope
- [ ] 短 handoff 四段式齊全（見下）

### 老闆短 handoff 四段式

- **What** — 1–3 行：改了什麼
- **Green lights** — verify／CI／preview（有則附連結）
- **Decide** — 合／不合，或唯一要老闆選的點
- **Links** — Issue／PR／預覽；細節只放連結，不長文

## OUT

- 不接 Cursor GitHub assign 自動開工（老闆不用 Cursor）
- 不做 auto-merge／gardening 第三層
- 不加產品功能 UI
- 不改 verify 管線行為（本票僅 docs／yml／pointer，除非為跑綠必要）

## Acceptance

- [ ] `feature.yml`／`bug.yml` 含 Why、IN、OUT、Acceptance、Risks／Notes（Acceptance 仍必填勾選）
- [ ] `OUTER_LOOP.md`（＋開工／自審文件若拆檔）老闆／隊長能照著跑，不靠口頭補
- [ ] 開工 checklist、自審 checklist（含「差不多＝不過」＋一眼可見／行為）、四段式 handoff 皆在 repo 可見
- [ ] `AGENTS.md` 若缺 pointer 則補一行到外環入口
- [ ] 用新範本開一張示範 Issue 欄位齊全（可關或留作範例）— **Kururu 實作後由 Keroro／老闆確認**
- [ ] `./bin/verify` 仍綠（僅改 docs／yml 也跑一次）
- [ ] PR 短寫 what／綠燈／決定點

## Risks

- 範本欄位過多 → 老闆懶填；緩解：標籤短、placeholder 給一句例、Risks 選填
- 「一眼可見」標準主觀 → 自審寫死「看不出差＝不過」，爭議升級老闆
- 文件與範本不同步 → 單一 OUTER_LOOP 為入口，拆檔用連結互指

## Assignees

1. **Dororo** — 本規格（完成）
2. **Kururu** — 依本檔改範本＋文件並開 PR
3. **Keroro** — 自審後交老闆合／不合
