# Outer Loop（外圈）

可執行手冊。順序固定，不跳步。

## 固定順序

1. **老闆開單** — 用 Feature／Bug 範本（Why／IN／OUT／Acceptance；Risks 選填）
2. **`Issue #N 開工`** — 在 Keroro 說這句；小隊照 [開工 checklist](docs/start-checklist.md) 開工
3. **小隊** — 實作 → 開 PR（原子、短 body、`./bin/verify` 綠）；**不合入 main**
4. **Keroro 自審** — 照 [自審 checklist](docs/self-review.md)；**差不多＝不過**
5. **短 handoff** — 四段式交老闆（見下／自審文件）
6. **合／不合** — 老闆在 Keroro 回；產品功能 PR **不合入 main**，除非老闆說 **合**

## 鐵則

- **驗收**：老闆／Keroro 依 [ACCEPTANCE_RUBRIC.md](ACCEPTANCE_RUBRIC.md) — 綠燈＋經驗證據，不靠逐行讀碼。
- 產品功能 PR **不合入 main**，除非老闆說合。
- 無 auto-merge；無未請示擴 OUT。
- 細節：`docs/start-checklist.md`、`docs/self-review.md`；規格來源：`docs/outer-loop-hardening.md`

## 老闆短 handoff 四段式

Keroro Pass 後交老闆，只寫這四段（細節放連結）：

- **What** — 1–3 行：改了什麼
- **Green lights** — verify／CI／preview（有則附連結）
- **Decide** — 合／不合，或唯一要老闆選的點
- **Links** — Issue／PR／預覽
