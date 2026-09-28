import { useState } from "react";
import { INITIAL_GREETING, nextGreeting } from "./helloLogic";
import type { GreetingState } from "./helloTypes";

export function HelloView() {
  const [state, setState] = useState<GreetingState>(INITIAL_GREETING);

  const handleGreet = () => {
    setState((current) => nextGreeting(current, "greet"));
  };

  const handleReset = () => {
    setState((current) => nextGreeting(current, "reset"));
  };

  return (
    <section data-testid="hello-root" className="hello">
      <h1 data-testid="hello-title">Agent Friendly Kitchen</h1>
      <p data-testid="hello-message" data-tone={state.tone}>
        {state.message}
      </p>
      <p data-testid="hello-count">Greetings: {state.greetCount}</p>
      <div className="hello-actions">
        <button
          type="button"
          data-testid="hello-greet-button"
          onClick={handleGreet}
        >
          Greet
        </button>
        <button
          type="button"
          data-testid="hello-reset-button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
