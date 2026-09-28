import { describe, expect, it } from "vitest";
import {
  INITIAL_THEME_TOGGLE,
  nextThemeToggle,
  themeToggleStatusLabel,
} from "./themeToggleLogic";

describe("nextThemeToggle", () => {
  it("starts in light theme", () => {
    expect(INITIAL_THEME_TOGGLE.theme).toBe("light");
    expect(themeToggleStatusLabel(INITIAL_THEME_TOGGLE)).toBe("淺色");
  });

  it("toggles to dark", () => {
    const afterDark = nextThemeToggle(INITIAL_THEME_TOGGLE, "toggle");
    expect(afterDark.theme).toBe("dark");
    expect(themeToggleStatusLabel(afterDark)).toBe("深色");
  });

  it("toggles back to light", () => {
    const afterDark = nextThemeToggle(INITIAL_THEME_TOGGLE, "toggle");
    const afterLight = nextThemeToggle(afterDark, "toggle");
    expect(afterLight.theme).toBe("light");
    expect(themeToggleStatusLabel(afterLight)).toBe("淺色");
    expect(afterLight).toEqual(INITIAL_THEME_TOGGLE);
  });
});
