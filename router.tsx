import { Route, Routes } from "react-router-dom";

import SignupForm from './src/modules/auth/Components/Forms/SignupForm'
import OTPForm from './src/modules/auth/Components/Forms/OTPForm'
import AuthLayout from './src/modules/auth/pages/AuthLayout'
import LoginForm from './src/modules/auth/Components/Forms/LoginForm'
import ForgetPassword from "./src/modules/auth/Components/Forms/ForgetPassword";
import ProtectedRoute from "./src/shared/components/ProtectedRoute";
import Dashboard from "./src/layouts/Dashboard";
export default function AppRouter() {
    return(
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
                <Route index element={<LoginForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="verify-otp" element={<OTPForm />} />
                <Route path="forget-password" element={<ForgetPassword />} />
            </Route>
            
            <Route element={<ProtectedRoute/>}>
                    <Route path="home" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}
