import { AppShell } from "./app";
import { HelloView } from "./features/hello";

export default function App() {
  return (
    <AppShell>
      <HelloView />
    </AppShell>
  );
}
