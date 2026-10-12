import { useEffect, useState } from "react"


export default function useDebounce<T>(value : T , delay = 400 ) {
    const [debounce , setDebounce] = useState<T | string>("")
    
    useEffect(()=>{
        const timer = setTimeout(()=> setDebounce(value) , delay);
        return ()=> clearTimeout(timer) 
    }, [value , delay])

  return debounce ;
}
