import { useEffect } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster, toast } from "sonner";
import AppRouter from "../router";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import { ApiError, SessionExpiredError } from "./lib/api";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const showRequestError = (error: Error, meta?: Record<string, unknown>) => {
  // Session expiry is reported once by the auth context; inline forms show their own errors.
  if (error instanceof SessionExpiredError || meta?.inlineError) return;
  const message = error.message || i18n.t("common.genericError");
  toast.error(message, { id: `api-error:${message}` });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: (error, query) => showRequestError(error, query.meta) }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => showRequestError(error, mutation.meta),
  }),
  defaultOptions: {
    queries: {
      staleTime: 15_000,
      // Client errors (4xx) will not fix themselves, so only retry network/server failures once.
      retry: (failureCount, error) => {
        const status = error instanceof ApiError ? error.status : 0;
        return failureCount < 1 && !(status >= 400 && status < 500);
      },
    },
  },
});

function ThemedToaster() {
  const { theme } = useTheme();
  const { i18n: i18nInstance } = useTranslation();
  return <Toaster position="top-center" richColors closeButton theme={theme} dir={i18nInstance.dir()} />;
}

export default function App() {
  useEffect(() => {
    // Most API data is localized through Accept-Language, so reload it when the language changes.
    const reload = () => queryClient.invalidateQueries();
    i18n.on("languageChanged", reload);
    return () => i18n.off("languageChanged", reload);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemedToaster />
        <BrowserRouter>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
