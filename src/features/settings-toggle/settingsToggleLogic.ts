import type {
  SettingsToggleAction,
  SettingsToggleState,
} from "./settingsToggleTypes";

export const INITIAL_SETTINGS_TOGGLE: SettingsToggleState = {
  notificationsEnabled: false,
};

export function nextSettingsToggle(
  state: SettingsToggleState,
  action: SettingsToggleAction,
): SettingsToggleState {
  if (action === "toggle") {
    return {
      notificationsEnabled: !state.notificationsEnabled,
    };
  }

  return state;
}

export function settingsToggleStatusLabel(
  state: SettingsToggleState,
): string {
  return state.notificationsEnabled ? "開啟" : "關閉";
}
