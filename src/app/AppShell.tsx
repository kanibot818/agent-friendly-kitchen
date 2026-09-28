import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div data-testid="app-shell" className="app-shell">
      <main data-testid="app-main">{children}</main>
    </div>
  );
}
