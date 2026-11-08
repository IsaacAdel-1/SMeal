import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import i18n from "@/i18n";
import { logoutRequest } from "../Services/auth.service";
import type { LoginResponse, User } from "../types";
import {
  SESSION_EXPIRED_EVENT,
  clearSession,
  getStoredUser,
  getToken,
  hasSession,
  saveSession,
} from "../utils/session";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (response: LoginResponse, remember: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(() => (hasSession() ? getStoredUser() : null));

  const login = useCallback(
    (response: LoginResponse, remember: boolean) => {
      // Never show cached data that belongs to a previous account.
      queryClient.clear();
      saveSession(response, remember);
      setUser(response.user);
    },
    [queryClient],
  );

  const logout = useCallback(() => {
    logoutRequest(getToken()).catch(() => undefined);
    clearSession();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    const onExpired = () => {
      setUser(null);
      queryClient.clear();
      toast.error(i18n.t("common.sessionExpired"), { id: "session-expired" });
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired);
  }, [queryClient]);

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
