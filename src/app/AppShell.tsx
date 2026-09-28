import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div data-testid="app-shell" className="app-shell">
      <header className="page-header" data-testid="page-header">
        <p className="page-header-eyebrow">KITCHEN</p>
        <h1 className="page-header-title">Agent Friendly</h1>
      </header>
      <main data-testid="app-main">{children}</main>
    </div>
  );
}
