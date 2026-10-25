import { Route, Routes } from "react-router-dom";

import SignupForm from './src/modules/auth/Components/Forms/SignupForm'
import OTPForm from './src/modules/auth/Components/Forms/OTPForm'
import AuthLayout from './src/modules/auth/pages/AuthLayout'
import LoginForm from './src/modules/auth/Components/Forms/LoginForm'
import ForgetPassword from "./src/modules/auth/Components/Forms/ForgetPassword";
import ProtectedRoute from "./src/shared/components/ProtectedRoute";
import Dashboard from "./src/layouts/Dashboard";
import Orders from "./src/modules/orders/pages/Orders";
import HomePage from "./src/modules/home/pages/HomePage";
import History from "./src/modules/history/pages/History";
import Profile from "@/modules/Profile/pages/Profile";
import RestaurantMenuPage from "@/modules/restaurant-menu/pages/RestaurantMenuPage";
import SetNewPasswordForm from "@/modules/auth/Components/Forms/ResetNewPassword";
import OrderInvoice from "@/modules/orders/pages/OrderInvoice";
export default function AppRouter() {
    return(
        <Routes>
            <Route path="/" element={<AuthLayout/>}>
                <Route index element={<LoginForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="verify-otp" element={<OTPForm />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route path="reset-password" element={<SetNewPasswordForm />} />
            </Route>
            
            <Route element={<ProtectedRoute/>}>
                    <Route element={<Dashboard />}>
                        <Route path="home" element={<HomePage/>} />
                        <Route path="restaurants/:restaurantId" element={<RestaurantMenuPage />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="/orders/:sessionId/invoice" element={<OrderInvoice />} />
                        <Route path="history" element={<History />} />
                        <Route path="settings" element={<Profile />} />
                    </Route>
            </Route>
        </Routes>
    )
}
