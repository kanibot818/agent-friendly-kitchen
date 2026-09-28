# FEATURE_MAP

Navigation map for agent-friendly work in this repository.

**Gate:** every `data-testid` listed in the tables below must exist in `src/**` (`./bin/verify` → `feature-map-testids`).

## Features

### hello

| Field | Value |
| --- | --- |
| Path | `/` (default route; single-page app) |
| Public API | `src/features/hello/index.ts` |
| UI | `HelloView` |
| Logic | `nextGreeting`, `INITIAL_GREETING`, `formatLastGreetedAt` |
| Types | `GreetingState`, `GreetingTone`, `GreetingAction` |
| Unit tests | `src/features/hello/helloLogic.test.ts` |
| E2E | `e2e/hello.spec.ts` |

#### User flows

1. Open the app at `/`.
2. Read the greeting text in `hello-message` (`Hello, kitchen`).
3. Read `hello-last-greeted` (`尚未打招呼` before any greet).
4. Click `hello-greet-button` to advance the greeting via an explicit click handler (no `useEffect`).
5. Observe `hello-message`, `hello-count`, and `hello-last-greeted` update (last greeted shows a local formatted time).
6. Click `hello-reset-button` to restore the initial greeting and clear last greeted back to `尚未打招呼`.

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| `app-shell` | Shell wrapper | App chrome container |
| `app-main` | Main landmark | Primary content region |
| `hello-root` | Hello feature section | Feature root for e2e |
| `hello-title` | Heading | App / feature title |
| `hello-message` | Paragraph | Current greeting text |
| `hello-count` | Paragraph | Number of greet actions |
| `hello-last-greeted` | Paragraph | Last greet time or never-greeted copy |
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

### settings-toggle

| Field | Value |
| --- | --- |
| Path | `/` (same page below user-profile) |
| Public API | `src/features/settings-toggle/index.ts` |
| UI | `SettingsToggleView` |
| Logic | `nextSettingsToggle`, `INITIAL_SETTINGS_TOGGLE`, `settingsToggleStatusLabel` |
| Types | `SettingsToggleState`, `SettingsToggleAction` |
| Unit tests | `src/features/settings-toggle/settingsToggleLogic.test.ts` |
| E2E | `e2e/settings-toggle.spec.ts` |

#### User flows

1. Open the app at `/`.
2. Read the settings panel: `settings-toggle-title` shows `通知設定`, and `settings-toggle-status` shows `狀態：關閉` by default.
3. Click `settings-toggle-btn` (開啟通知) to flip `notificationsEnabled` via an explicit click handler (no `useEffect`).
4. Observe `settings-toggle-status` update to `狀態：開啟` and the button label become `關閉通知`.
5. Click `settings-toggle-btn` again to restore `狀態：關閉`.

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| `settings-toggle-root` | Section | Feature root for e2e |
| `settings-toggle-title` | Heading | Feature title (`通知設定`) |
| `settings-toggle-status` | Paragraph | Current on/off status (`開啟` / `關閉`) |
| `settings-toggle-btn` | Button | Toggles notifications enabled |

#### Import rules

- Outside the feature, import only from `@/features/settings-toggle` or `./features/settings-toggle` (the barrel).
- Deep imports such as `./features/settings-toggle/SettingsToggleView` are lint errors.

### theme-toggle

| Field | Value |
| --- | --- |
| Path | `/` (same page below settings-toggle) |
| Public API | `src/features/theme-toggle/index.ts` |
| UI | `ThemeToggleView` |
| Logic | `nextThemeToggle`, `INITIAL_THEME_TOGGLE`, `themeToggleStatusLabel` |
| Types | `ThemeMode`, `ThemeToggleState`, `ThemeToggleAction` |
| Unit tests | `src/features/theme-toggle/themeToggleLogic.test.ts` |
| E2E | `e2e/theme-toggle.spec.ts` |

#### User flows

1. Open the app at `/`.
2. Read the theme panel: `theme-toggle-title` shows `主題設定`, and `theme-toggle-status` shows `主題：淺色` by default.
3. Click `theme-toggle-btn` (切換深色) to flip theme via an explicit click handler (no `useEffect`); the handler also sets `data-theme` on `document.documentElement`.
4. Observe `theme-toggle-status` update to `主題：深色` and the button label become `切換淺色`.
5. Click `theme-toggle-btn` again to restore `主題：淺色`.

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| `theme-toggle-root` | Section | Feature root for e2e |
| `theme-toggle-title` | Heading | Feature title (`主題設定`) |
| `theme-toggle-status` | Paragraph | Current theme status (`淺色` / `深色`) |
| `theme-toggle-btn` | Button | Toggles light/dark theme |

#### Import rules

- Outside the feature, import only from `@/features/theme-toggle` or `./features/theme-toggle` (the barrel).
- Deep imports such as `./features/theme-toggle/ThemeToggleView` are lint errors.
