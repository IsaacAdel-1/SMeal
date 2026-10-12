import { useAuth } from "../../auth/context/AuthContext";

export type User = {
  id: number;
  fullName: string;
  role: "customer" | "admin" | "Organizer";
  isHost : boolean ;
};

export const mockUser: User = {
  id: 1,
  fullName: "Ahmed Hassan",
  role: "Organizer",
  isHost : true ,
};
export default function HomeNavbar() {
  const {user} = useAuth()
      let InitialLetters ;  
      console.log(user)
      if(user)
      { 
        InitialLetters = user?.firstName.charAt(0) + user?.lastName.charAt(0)
      }
  return (
    <>
        <div className="bg-[#0c0d12] px-7 py-4.5 text-white">
            <div className="flex gap-2">
                <p className="bg-[#e93429] h-12 w-12 flex justify-center items-center text-2xl font-semibold rounded-2xl">{InitialLetters}</p>
                <div>
                    <p>{user?.firstName} {user?.lastName}</p>
                    <div className="flex gap-4">

                    <p className={` px-4 rounded-2xl flex justify-center font-bold text-[12px] ${mockUser.role === "Organizer" ? "bg-[#e42d23]" :""}`}>{mockUser.role}</p>
                    {mockUser.isHost && <p className="text-[#848488] text-sm">Session host</p> }
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}
