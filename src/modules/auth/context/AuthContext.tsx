import { createContext, useContext, useState, type ReactNode } from "react";
import Cookies from "js-cookie";

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
    const [user , setUser] = useState <User | null >(() => {
    const savedUser = Cookies.get("user");
    return savedUser ? JSON.parse(savedUser) : null;
})
    const login = (userData : User) =>{
        setUser(userData) 
        Cookies.set("user" , JSON.stringify(userData))
    }

    const logout = ()=>{
        setUser(null)
        Cookies.remove("token")
        Cookies.remove("refreshToken")
        Cookies.remove("user")
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

