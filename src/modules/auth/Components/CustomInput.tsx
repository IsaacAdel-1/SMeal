import { useEffect, useRef, useState, type ReactNode } from "react";

export interface CustomInputProps {
  label : string; 
  icon : ReactNode ; 
  type? : string ;
  name : string ; 
  onChange : React.ChangeEventHandler<HTMLInputElement>
  onBlur : React.FocusEventHandler<HTMLInputElement>
  ref : React.Ref<HTMLInputElement>
}

export default function CustomInput({label , icon , type= "text" , ...inputProps } : CustomInputProps) {
    const InputRef = useRef<HTMLInputElement | null>(null)
    const [InputFocus , setInputFocus] = useState(false) ;
    const [hasValue , setHasValue] = useState(false)
   
    // if(InputRef.current?.value) {setHasValue(true)} 
    useEffect(()=>{
      if(!!InputRef.current?.value){
        setHasValue(true)
      } 
    } , [])
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
      const value = e.target.value ; 
      if(value) setInputFocus(true)
    }
  return (
    <div className="relative w-full" onFocus={()=>setInputFocus(true)} onBlur={()=>  setInputFocus(false)}>
        <label className={`pointer-events-none absolute left-10   ${InputFocus || hasValue? " top-0 text-[#ee3f3c] text-[12px] font-bold" :"top-1/2 -translate-y-1/2 text-[#999999] text-[14px]"}`}>{label}</label>
        <div className={`pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 size-5 ${InputFocus ? "text-[#ee3f3c]" : "text-[#999999]"}`}>{icon}</div>
       <input className="px-10 pt-4 pb-1 rounded-xl w-full outline-0 border border-[#e5e5e5] max-[620px]:py-2 focus:bg-white bg-[#f8f8f8]"
        type={type} {...inputProps}  
        // ref={InputRef}
        onChange={(e)=> handleChange(e)}
        />
    </div>
  )
}
