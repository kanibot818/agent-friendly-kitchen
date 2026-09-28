import type { GreetingAction, GreetingState } from "./helloTypes";

export const INITIAL_GREETING: GreetingState = {
  message: "Hello, kitchen",
  tone: "neutral",
  greetCount: 0,
  lastGreetedAt: null,
};

export function formatLastGreetedAt(lastGreetedAt: string | null): string {
  if (lastGreetedAt === null) {
    return "尚未打招呼";
  }

  return `上次打招呼：${new Date(lastGreetedAt).toLocaleString("zh-TW")}`;
}

export function nextGreeting(
  state: GreetingState,
  action: GreetingAction,
  now: () => Date = () => new Date(),
): GreetingState {
  if (action === "reset") {
    return INITIAL_GREETING;
  }

  const greetCount = state.greetCount + 1;
  return {
    message: `Hello again (#${String(greetCount)})`,
    tone: "warm",
    greetCount,
    lastGreetedAt: now().toISOString(),
  };
}
