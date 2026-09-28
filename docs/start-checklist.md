# 開工 checklist（小隊）

入口：[OUTER_LOOP.md](../OUTER_LOOP.md)。自審見 [self-review.md](self-review.md)。

在說 `Issue #N 開工` 之後、動手之前：先跑 `./bin/kickoff-issue N`（印 Why／IN／OUT、切到最新 main、開 `feat/<n>-slug`、印本清單提醒；**不**實作、**不**開 PR），再勾完：

- [ ] 讀完本 Issue（Why／IN／OUT／Acceptance）
- [ ] 讀 `AGENTS.md`、`FEATURE_MAP.md`、相關 spec
- [ ] 範圍已鎖：OUT 未偷加；Acceptance 未改口前不開做
- [ ] 已寫／確認 verify 計畫（改哪、怎麼證；視覺／行為若有則含一眼驗）
- [ ] 開工前已知阻斷點（權限、依賴、老闆決策）→ 先升級，不硬做
