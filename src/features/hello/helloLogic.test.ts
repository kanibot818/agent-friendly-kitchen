import { describe, expect, it } from "vitest";
import {
  formatLastGreetedAt,
  INITIAL_GREETING,
  nextGreeting,
} from "./helloLogic";

describe("nextGreeting", () => {
  it("starts from the initial greeting", () => {
    expect(INITIAL_GREETING.message).toBe("Hello, kitchen");
    expect(INITIAL_GREETING.greetCount).toBe(0);
    expect(INITIAL_GREETING.tone).toBe("neutral");
    expect(INITIAL_GREETING.lastGreetedAt).toBeNull();
  });

  it("updates message and count on greet without useEffect", () => {
    const fixedNow = () => new Date("2026-09-28T08:00:00.000Z");
    const afterOne = nextGreeting(INITIAL_GREETING, "greet", fixedNow);
    expect(afterOne.message).toBe("Hello again (#1)");
    expect(afterOne.greetCount).toBe(1);
    expect(afterOne.tone).toBe("warm");
    expect(afterOne.lastGreetedAt).toBe("2026-09-28T08:00:00.000Z");

    const afterTwo = nextGreeting(afterOne, "greet", fixedNow);
    expect(afterTwo.message).toBe("Hello again (#2)");
    expect(afterTwo.greetCount).toBe(2);
    expect(afterTwo.lastGreetedAt).toBe("2026-09-28T08:00:00.000Z");
  });

  it("resets to the initial greeting including lastGreetedAt", () => {
    const fixedNow = () => new Date("2026-09-28T08:00:00.000Z");
    const afterGreet = nextGreeting(INITIAL_GREETING, "greet", fixedNow);
    const reset = nextGreeting(afterGreet, "reset");
    expect(reset).toEqual(INITIAL_GREETING);
    expect(reset.lastGreetedAt).toBeNull();
  });
});

describe("formatLastGreetedAt", () => {
  it("shows never-greeted copy when null", () => {
    expect(formatLastGreetedAt(null)).toBe("尚未打招呼");
  });

  it("formats ISO timestamps for local display", () => {
    const formatted = formatLastGreetedAt("2026-09-28T08:00:00.000Z");
    expect(formatted.startsWith("上次打招呼：")).toBe(true);
    expect(formatted).not.toBe("尚未打招呼");
  });
});
