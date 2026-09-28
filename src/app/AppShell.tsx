import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div data-testid="app-shell" className="app-shell">
      <header className="chrome" data-testid="app-chrome">
        <span className="chrome-product">Kitchen</span>
        <span className="chrome-meta">agent demo shell</span>
      </header>
      <main data-testid="app-main">{children}</main>
    </div>
  );
}
