import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "../shared/components/sidebar";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const closeSidebar = () => setSidebarOpen(false);

  // The page scrolls inside <main>, not the window, so reset it on navigation.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {sidebarOpen && (
        <div aria-hidden="true" className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={cn(
          "h-full shrink-0 max-md:fixed max-md:inset-y-0 max-md:start-0 max-md:z-40 max-md:shadow-xl",
          !sidebarOpen && "max-md:hidden",
        )}
      >
        <Sidebar onNavigate={closeSidebar} />
      </aside>

      <main
        ref={mainRef}
        id="main-content"
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto bg-background text-foreground"
      >
        <Outlet />
      </main>

      <button
        type="button"
        aria-label={sidebarOpen ? t("sidebar.closeMenu") : t("sidebar.openMenu")}
        aria-expanded={sidebarOpen}
        onClick={() => setSidebarOpen((open) => !open)}
        className="fixed end-3 top-4 z-50 flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm md:hidden"
      >
        {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
    </div>
  );
}
