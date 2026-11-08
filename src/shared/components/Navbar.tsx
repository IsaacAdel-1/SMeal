import type { ReactNode } from "react";
import logo from "../../assets/images/sm_logo.png";

export default function Navbar({ header, actions }: { header: string; actions?: ReactNode }) {
  return (
    <nav className="flex shrink-0 items-center gap-4 border-b border-border bg-surface p-5 pe-16 md:pe-5">
      <img src={logo} alt="" className="h-11 w-11 shrink-0" />
      <h1 className="min-w-0 flex-1 truncate text-xl font-bold text-foreground">{header}</h1>
      {actions}
    </nav>
  );
}
