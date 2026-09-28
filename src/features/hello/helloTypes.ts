export type GreetingTone = "neutral" | "warm";

export type GreetingState = {
  message: string;
  tone: GreetingTone;
  greetCount: number;
};

export type GreetingAction = "greet" | "reset";
