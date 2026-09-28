import { AppShell } from "./app";
import { HelloView } from "./features/hello";
import { UserProfileView } from "./features/user-profile";

export default function App() {
  return (
    <AppShell>
      <HelloView />
      <UserProfileView />
    </AppShell>
  );
}
