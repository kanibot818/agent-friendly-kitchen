import type { ThemeToggleAction, ThemeToggleState } from "./themeToggleTypes";

export const INITIAL_THEME_TOGGLE: ThemeToggleState = {
  theme: "light",
};

export function nextThemeToggle(
  state: ThemeToggleState,
  action: ThemeToggleAction,
): ThemeToggleState {
  if (action === "toggle") {
    return {
      theme: state.theme === "light" ? "dark" : "light",
    };
  }

  return state;
}

export function themeToggleStatusLabel(state: ThemeToggleState): string {
  return state.theme === "light" ? "淺色" : "深色";
}
