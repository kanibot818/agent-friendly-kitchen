import { AppShell } from "./app";
import { HelloView } from "./features/hello";
import { UserProfileView } from "./features/user-profile";
import { SettingsToggleView } from "./features/settings-toggle";

export default function App() {
  return (
    <AppShell>
      <HelloView />
      <UserProfileView />
      <SettingsToggleView />
    </AppShell>
  );
}
