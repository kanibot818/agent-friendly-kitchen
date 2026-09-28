import type { GreetingAction, GreetingState } from "./helloTypes";

export const INITIAL_GREETING: GreetingState = {
  message: "Hello, kitchen",
  tone: "neutral",
  greetCount: 0,
};

export function nextGreeting(
  state: GreetingState,
  action: GreetingAction,
): GreetingState {
  if (action === "reset") {
    return INITIAL_GREETING;
  }

  const greetCount = state.greetCount + 1;
  return {
    message: `Hello again (#${String(greetCount)})`,
    tone: "warm",
    greetCount,
  };
}
