
import './App.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router'
import { AuthProvider } from './modules/auth/context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {

  const queryClient = new QueryClient() ;
  return (
    <>
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
