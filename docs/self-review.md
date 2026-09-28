# 自審 checklist（Keroro）

入口：[OUTER_LOOP.md](../OUTER_LOOP.md)。開工見 [start-checklist.md](start-checklist.md)。

規則：**差不多＝不過**。Fail → 具體 redo 點退回；Pass → 才寫短 handoff。

驗收標準見 [ACCEPTANCE_RUBRIC.md](../ACCEPTANCE_RUBRIC.md)：綠燈＋經驗證據，不靠逐行讀碼。

- [ ] 對齊 Acceptance：每一項可勾或可指出證據；不可「方向對了」
- [ ] **一眼可見／行為**：UI／文案／流程有差時，打開預覽或路徑，肉眼／操作能看出對齊；看不出差＝不過
- [ ] `./bin/verify`（或同等）綠；CI 綠（或已說明為何本 PR 僅 docs／yml 仍跑過）；實證看 Actions artifact `verify-logs` → `verify.json`
- [ ] PR／交付未越 OUT；無自動 merge、無未請示擴 scope
- [ ] 短 handoff 四段式齊全（見下）

## 老闆短 handoff 四段式

- **What** — 1–3 行：改了什麼
- **Green lights** — verify／CI／preview（有則附連結）
- **Decide** — 合／不合，或唯一要老闆選的點
- **Links** — Issue／PR／預覽；細節只放連結，不長文
