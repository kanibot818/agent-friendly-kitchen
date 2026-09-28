import { describe, expect, it } from "vitest";
import { INITIAL_GREETING, nextGreeting } from "./helloLogic";

describe("nextGreeting", () => {
  it("starts from the initial greeting", () => {
    expect(INITIAL_GREETING.message).toBe("Hello, kitchen");
    expect(INITIAL_GREETING.greetCount).toBe(0);
    expect(INITIAL_GREETING.tone).toBe("neutral");
  });

  it("updates message and count on greet without useEffect", () => {
    const afterOne = nextGreeting(INITIAL_GREETING, "greet");
    expect(afterOne.message).toBe("Hello again (#1)");
    expect(afterOne.greetCount).toBe(1);
    expect(afterOne.tone).toBe("warm");

    const afterTwo = nextGreeting(afterOne, "greet");
    expect(afterTwo.message).toBe("Hello again (#2)");
    expect(afterTwo.greetCount).toBe(2);
  });

  it("resets to the initial greeting", () => {
    const afterGreet = nextGreeting(INITIAL_GREETING, "greet");
    const reset = nextGreeting(afterGreet, "reset");
    expect(reset).toEqual(INITIAL_GREETING);
  });
});
