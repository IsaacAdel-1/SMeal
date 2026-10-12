import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
    userId : string ;
    email: string,
    firstName: string,
    lastName: string,
    language: string,
    phoneNumber: string
}

type AuthContextType = {
    user : User | null ;
    login : (userData : User)=> void;
    logout : ()=> void;
} 
const AuthContext = createContext<AuthContextType | null>(null)

type AuthProviderProps = {
    children : ReactNode ;
}

export function AuthProvider({children} : AuthProviderProps){
    const [user , setUser] = useState <User | null >(null)
    const login = (userData : User) =>{
        setUser(userData) 
    }

    const logout = ()=>{
        setUser(null)

    }

    return (
        <AuthContext.Provider value={{user , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth (){
    const context = useContext(AuthContext); 

    if(context === null) {
        throw new Error("Context must be used inside AuthProvider")
    }

    return context ;
} 

