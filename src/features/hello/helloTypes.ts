export type GreetingTone = "neutral" | "warm";

export type GreetingState = {
  message: string;
  tone: GreetingTone;
  greetCount: number;
  lastGreetedAt: string | null;
};

export type GreetingAction = "greet" | "reset";
