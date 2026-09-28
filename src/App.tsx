import { AppShell } from "./app";
import { HelloView } from "./features/hello";
import { UserProfileView } from "./features/user-profile";
import { SettingsToggleView } from "./features/settings-toggle";
import { ThemeToggleView } from "./features/theme-toggle";
import { FeatureMapView } from "./features/feature-map";

export default function App() {
  return (
    <AppShell>
      <HelloView />
      <UserProfileView />
      <SettingsToggleView />
      <ThemeToggleView />
      <FeatureMapView />
    </AppShell>
  );
}
