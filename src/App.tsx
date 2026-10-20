
import './App.css'

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router'
import { AuthProvider } from './modules/auth/context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from "sonner";
import { toast } from "sonner";

const showRequestError = (error: Error) => toast.error(error.message || "Something went wrong. Please try again.", { id: `api-error:${error.message}` });
const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: showRequestError }),
  mutationCache: new MutationCache({ onError: showRequestError }),
});
function App() {

  return (
    <>
    <Toaster position="top-center" richColors />
      <BrowserRouter>
      <AuthProvider>
      <ThemeProvider>

      <QueryClientProvider client={queryClient}>

        <AppRouter/>
        {/* <Dashboard/> */}
        {/* <ProfileCard/> */}
      </QueryClientProvider>
      </ThemeProvider>
      </AuthProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
