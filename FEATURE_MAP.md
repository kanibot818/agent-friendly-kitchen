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

### user-profile

| Field | Value |
| --- | --- |
| Path | `/` (same page below hello) |
| Public API | `src/features/user-profile/index.ts` |
| UI | `UserProfileView` |
| Logic | `nextUserProfile`, `INITIAL_USER_PROFILE_STATE`, `INITIAL_PROFILE` |
| Types | `UserProfile`, `UserProfileState`, `UserProfileMode`, `UserProfileAction` |
| Unit tests | `src/features/user-profile/userProfileLogic.test.ts` |
| E2E | `e2e/user-profile.spec.ts` |

#### User flows

1. Open the app at `/`.
2. Read the profile card: `user-name` and `user-email` show the current name and email.
3. Click `edit-btn` (編輯) to switch into edit mode with inputs (`user-name-input`, `user-email-input`).
4. Change name and/or email via the inputs (event-handler driven; no `useEffect`).
5. Click `save-btn` (儲存) to write the draft back to the card and show `save-success` with text `儲存成功`.

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| `user-profile-root` | Section | Feature root for e2e |
| `user-profile-title` | Heading | Feature title |
| `user-profile-card` | Card wrapper | View-mode card |
| `user-name` | Paragraph | Display name on card |
| `user-email` | Paragraph | Email on card |
| `edit-btn` | Button | Enter edit mode |
| `user-profile-form` | Form | Edit-mode form |
| `user-name-input` | Text input | Edit display name |
| `user-email-input` | Email input | Edit email |
| `save-btn` | Submit button | Save draft and return to view |
| `save-success` | Paragraph | Shows `儲存成功` after save |

#### Import rules

- Outside the feature, import only from `@/features/user-profile` or `./features/user-profile` (the barrel).
- Deep imports such as `./features/user-profile/UserProfileView` are lint errors.
