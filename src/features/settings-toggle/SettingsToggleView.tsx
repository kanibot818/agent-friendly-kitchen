import { useState } from "react";
import {
  INITIAL_SETTINGS_TOGGLE,
  nextSettingsToggle,
  settingsToggleStatusLabel,
} from "./settingsToggleLogic";

export function SettingsToggleView() {
  const [state, setState] = useState(INITIAL_SETTINGS_TOGGLE);

  const handleToggle = () => {
    setState((current) => nextSettingsToggle(current, "toggle"));
  };

  const statusLabel = settingsToggleStatusLabel(state);

  return (
    <section data-testid="settings-toggle-root" className="settings-toggle section">
      <h2 data-testid="settings-toggle-title">通知設定</h2>
      <p data-testid="settings-toggle-status" className="text-muted">
        狀態：{statusLabel}
      </p>
      <div className="settings-toggle-actions">
        <button
          type="button"
          className={
            state.notificationsEnabled
              ? "btn btn-success"
              : "btn btn-primary"
          }
          data-testid="settings-toggle-btn"
          onClick={handleToggle}
          aria-pressed={state.notificationsEnabled}
        >
          {state.notificationsEnabled ? "關閉通知" : "開啟通知"}
        </button>
      </div>
    </section>
  );
}
