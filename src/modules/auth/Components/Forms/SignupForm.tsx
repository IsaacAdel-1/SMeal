import { useForm } from "react-hook-form";
import CheckCircleIcon from "../../../../assets/svgs/CheckCircleIcon";
import LockIcon from "../../../../assets/svgs/LockIcon";
import MailIcon from "../../../../assets/svgs/MailIcon";
import UserIcon from "../../../../assets/svgs/UserIcon";
import CustomInput from "../CustomInput";

import useRegister from "../../hooks/useRegister";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

export default function SignupForm() {
    const User = <UserIcon />
    const Mail = <MailIcon/>
    const Lock = <LockIcon/>
    const CheckCircle = <CheckCircleIcon/>

    const schema = z.object({
        firstName : z.string().min(2 , "first Name should be at least 2 characters"),
        lastName : z.string().min(2 , "last Name should be at least 2 characters"),
        email : z.string().email(),
        phoneNumber : z.string().regex(/^01\d{9}$/, "Enter a valid Egyptian mobile number"),
        password : z.string().min(8 , "Password should be at least 8 characters"),
        termsAndConditions : z.boolean().refine((value) => value === true ,{
            message : "You must accept Terms & Conditions"
        })
    })
    type Register =z.infer<typeof schema>
    const {register , handleSubmit , formState : {errors}} = useForm<z.infer<typeof schema>>({resolver : zodResolver(schema)});
    const {mutate : registerUser , isError , isPending} = useRegister()
    
    const onSubmit = (data : Register)=>{
        const { termsAndConditions, ...registerData } = data;
        registerUser(registerData)
    }
  return (
    <div className="mt-20">
            <h2 className="font-bold text-[28px]">Create Account</h2>
            <p className="text-muted-foreground">Join sMeals to order fresh gourmet dishes</p>
            
            <div className="flex flex-col gap-3 mt-10">

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">

                <CustomInput label="First Name" icon={User} {...register("firstName")}/>
                <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
                <CustomInput label="Last Name" icon={User} {...register("lastName")}/>
                <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
                <CustomInput label="Email Address" icon={Mail} {...register("email")}/>
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
                <CustomInput label="Phone Number" icon={Lock} type="text" {...register("phoneNumber")}/>
                <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
                <CustomInput label="Password" icon={CheckCircle} type="password" {...register("password")}/>
                <p className="text-red-500 text-sm">{errors.password?.message}</p>
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" className="accent-brand size-4" id="termsAndConditions" {...register("termsAndConditions")}/>
                        <label htmlFor="termsAndConditions" className="">I accept Terms & Conditions</label>
                        
                    </div>
                    
        
                    <button className="text-brand text-sm font-bold cursor-pointer" type="button">Forget Password?</button>
                </div>
                {errors.termsAndConditions && (
                            <p className="text-red-500 text-sm">
                            {errors.termsAndConditions.message}
                            </p>
                        )}
                <button className="bg-linear-to-br from-brand to-brand-strong w-full text-white h-11.5 font-semibold rounded-xl" 
                type="submit" disabled={isPending}>{isPending? "Sending data...": "Sign Up"}</button>
            </form>
            {isError && <p>Error while registing</p>}
            <p className="">Don't have an account? <Link className="text-brand font-semibold cursor-pointer" to={'/login'}>Sign in</Link> </p>
            </div>
            
            
        </div>
  )
}
