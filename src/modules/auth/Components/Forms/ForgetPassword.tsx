import { useForm } from "react-hook-form"
import MailIcon from "../../../../assets/svgs/MailIcon"
import CustomInput from "../CustomInput"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useForgetPassword from "../../hooks/useForgetPassword"


export default function ForgetPassword() {
    const Mail = <MailIcon/>
    const schema = z.object({email : z.email()})
    const {register , handleSubmit , formState : {errors}} = useForm<z.infer<typeof schema>>({resolver : zodResolver(schema)})
    const {mutate : forgetPassword  , isPending } = useForgetPassword()
    const onSubmit = (data : z.infer<typeof schema>)=>{
        forgetPassword(data)
    }
 return (
        <div className="mt-40">
        <h2 className="font-bold text-[28px]">Reset Password</h2>
        <p className="text-[#555555] mb-10">Enter your email to receive recovery instructions</p>
        
        <form  onSubmit={handleSubmit(onSubmit)}>
          
          <CustomInput icon={Mail} label="REGISTERED EMAIL" {...register("email")} />  
        <button className="bg-linear-to-br from-[#ee3d3a] to-[#a41e23] w-full text-white h-11.5 font-semibold rounded-xl mt-6">{isPending ? "Sending..." : "Send Recovery Link"}</button>
        </form>
          {errors.email?.message &&<p className="text-red-500">
        {errors.email?.message ?? "Something went wrong"}
  </p>}

        
    </div>
  )
}
