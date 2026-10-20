import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme : () => void;
};
const ThemeContext = createContext<ThemeContextType | null>(null) ;

export function ThemeProvider ({children}:{children : ReactNode}){
    const [theme , setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });


    useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); 
        localStorage.setItem("theme", theme); 
    }, [theme]);
    
    
    const toggleTheme = ()=>{
        const nextTheme = theme === "dark" ? "light" : "dark"; 
        setTheme(nextTheme)
        localStorage.setItem("theme" , nextTheme)
    }

    return (
        <ThemeContext.Provider value={{theme , toggleTheme} }>
            {children}
        </ThemeContext.Provider>
    )
} 

export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context) throw new Error("use theme must be inside the provider")
    return context ;
}