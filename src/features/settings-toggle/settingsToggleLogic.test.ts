import { describe, expect, it } from "vitest";
import {
  INITIAL_SETTINGS_TOGGLE,
  nextSettingsToggle,
  settingsToggleStatusLabel,
} from "./settingsToggleLogic";

describe("nextSettingsToggle", () => {
  it("starts with notifications disabled", () => {
    expect(INITIAL_SETTINGS_TOGGLE.notificationsEnabled).toBe(false);
    expect(settingsToggleStatusLabel(INITIAL_SETTINGS_TOGGLE)).toBe("關閉");
  });

  it("toggles notifications on", () => {
    const afterOn = nextSettingsToggle(INITIAL_SETTINGS_TOGGLE, "toggle");
    expect(afterOn.notificationsEnabled).toBe(true);
    expect(settingsToggleStatusLabel(afterOn)).toBe("開啟");
  });

  it("toggles notifications off again", () => {
    const afterOn = nextSettingsToggle(INITIAL_SETTINGS_TOGGLE, "toggle");
    const afterOff = nextSettingsToggle(afterOn, "toggle");
    expect(afterOff.notificationsEnabled).toBe(false);
    expect(settingsToggleStatusLabel(afterOff)).toBe("關閉");
    expect(afterOff).toEqual(INITIAL_SETTINGS_TOGGLE);
  });
});
