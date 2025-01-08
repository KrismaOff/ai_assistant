import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {

    const location = useLocation();
    const token = !!localStorage.getItem("token");
    const tempToken = !!localStorage.getItem("tempToken");

    const authPages = ["login", "register", "verify"]
    const path = location.pathname.split('/').at(-1)

    if (!token && !authPages.includes(path)) return <Navigate to="/auth/login" replace/>; // если нет токена, то на auth
    if (!token && tempToken && path !== "verify") return <Navigate to="/auth/verify" replace/>; // если идет процесс верификации и есть temp токен, то только verify 
    if (!token && !tempToken && !authPages.splice(0, 2).includes(path)) return <Navigate to="/auth/login" replace/> // если нет temp токена, то нельзя проходить верификацию
    if (token && authPages.includes(path)) return <Navigate to="/profile" replace />; // нельзя заходить на auth, если есть токен

  return <Outlet />;
};

export default AuthGuard;