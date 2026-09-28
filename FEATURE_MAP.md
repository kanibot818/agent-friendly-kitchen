# FEATURE_MAP

Navigation map for agent-friendly work in this repository.

## Features

### hello

| Field | Value |
| --- | --- |
| Path | `/` (default route; single-page app) |
| Public API | `src/features/hello/index.ts` |
| UI | `HelloView` |
| Logic | `nextGreeting`, `INITIAL_GREETING` |
| Types | `GreetingState`, `GreetingTone`, `GreetingAction` |
| Unit tests | `src/features/hello/helloLogic.test.ts` |
| E2E | `e2e/hello.spec.ts` |

#### User flows

1. Open the app at `/`.
2. Read the greeting text in `hello-message` (`Hello, kitchen`).
3. Click `hello-greet-button` to advance the greeting via an explicit click handler (no `useEffect`).
4. Observe `hello-message` and `hello-count` update.
5. Click `hello-reset-button` to restore the initial greeting.

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| `app-shell` | Shell wrapper | App chrome container |
| `app-main` | Main landmark | Primary content region |
| `hello-root` | Hello feature section | Feature root for e2e |
| `hello-title` | Heading | App / feature title |
| `hello-message` | Paragraph | Current greeting text |
| `hello-count` | Paragraph | Number of greet actions |
| `hello-greet-button` | Button | Triggers greet action |
| `hello-reset-button` | Button | Triggers reset action |

#### Import rules

- Outside the feature, import only from `@/features/hello` or `./features/hello` (the barrel).
- Deep imports such as `./features/hello/HelloView` are lint errors.
