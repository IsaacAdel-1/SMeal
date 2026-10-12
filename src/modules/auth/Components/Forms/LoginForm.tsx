
import { useForm } from "react-hook-form";
import LockIcon from "../../../../assets/svgs/LockIcon";
import MailIcon from "../../../../assets/svgs/MailIcon";
import CustomInput from "../CustomInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";




export default function LoginForm() {
    const Mail = <MailIcon/>
    const Lock = <LockIcon/>
    const schema = z.object({
        email : z.email(),
        password : z.string().min(8 , "password at least 8 characters or digits")
    })
    const {mutate , isPending } = useLogin()
    const {register , handleSubmit , formState : {errors}} = useForm <z.infer<typeof schema>>({resolver : zodResolver(schema)})
    const onSubmit = (data : z.infer<typeof schema>)=>{
        mutate(data)
    }
  return (
    <div className="mt-45">
        <h2 className="font-bold text-[28px] ">Welcome Back</h2>
        <p className="text-[#555555]">Sign in to manage your meal plans</p>
        
        <form className="flex flex-col gap-3 mt-10" onSubmit={handleSubmit(onSubmit)}>

            <CustomInput label="Email Address" icon={Mail} {...register("email")}/>
            {errors.email?.message && <p>{errors.email.message}</p>}
            <CustomInput label="Password" icon={Lock} {...register("password")}/>
            {errors.password?.message && <p>{errors.password.message}</p>}


            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <input type="checkbox" className="accent-[#dd1613] size-4"/>
                    <label htmlFor="" className="">Remember Me</label>
                </div>

                <Link className="text-[#ee3d3a] text-sm font-bold cursor-pointer"  to={'/forget-password'}>Forget Password?</Link>
            </div>

            <button type="submit" className="bg-linear-to-br from-[#ee3d3a] to-[#a41e23] w-full text-white h-11.5 font-semibold rounded-xl">
                {isPending ? "Sending data..." :"Sign In"}</button>
            
            <p className="">Don't have an account? <Link className="text-[#ee3d3a] font-semibold cursor-pointer" to={'/signup'}>Sign Up</Link> </p>
        </form>
        
        
    </div>
  )
}
