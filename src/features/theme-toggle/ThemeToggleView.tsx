import { useState } from "react";
import {
  INITIAL_THEME_TOGGLE,
  nextThemeToggle,
  themeToggleStatusLabel,
} from "./themeToggleLogic";

export function ThemeToggleView() {
  const [state, setState] = useState(INITIAL_THEME_TOGGLE);

  const handleToggle = () => {
    setState((current) => {
      const next = nextThemeToggle(current, "toggle");
      document.documentElement.setAttribute("data-theme", next.theme);
      return next;
    });
  };

  const statusLabel = themeToggleStatusLabel(state);

  return (
    <section
      data-testid="theme-toggle-root"
      className="theme-toggle card"
      data-theme={state.theme}
    >
      <h2 data-testid="theme-toggle-title">主題設定</h2>
      <p data-testid="theme-toggle-status" className="text-muted">
        主題：{statusLabel}
      </p>
      <div className="theme-toggle-actions">
        <button
          type="button"
          className="btn btn-primary"
          data-testid="theme-toggle-btn"
          onClick={handleToggle}
          aria-pressed={state.theme === "dark"}
        >
          {state.theme === "light" ? "切換深色" : "切換淺色"}
        </button>
      </div>
    </section>
  );
}
