export type OTPFormData = {
  OTP0: string;
  OTP1: string;
  OTP2: string;
  OTP3: string;
};


export interface Register {
    firstName : string; 
    lastName : string; 
    email : string; 
    phoneNumber : string; 
    password : string ;
   
}
export type ResetPasswordParams = {
  userId: string;
  token: string;
  newPassword: string;
};