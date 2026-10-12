
import './App.css'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router'
import { AuthProvider } from './modules/auth/context/AuthContext';
// import Dashboard from './layouts/Dashboard';

function App() {

  const queryClient = new QueryClient() ;
  return (
    <>
      <BrowserRouter>
      <AuthProvider>

      <QueryClientProvider client={queryClient}>

        <AppRouter/>
        {/* <Dashboard/> */}

      </QueryClientProvider>
      </AuthProvider>
      </BrowserRouter>
      
    </>
  )
}

export default App
