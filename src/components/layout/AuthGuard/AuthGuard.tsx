import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ROUTES, buildPath } from "@/assets/data/paths";

import { constats } from "@/assets/data/constants";

const AuthGuard = () => {

  const { VERIFY, LOGIN, FORGOTPASSWORD } = ROUTES.AUTH.child
  const { EMAIL, CODE } = FORGOTPASSWORD.child
  const PROFILE = ROUTES.PROFILE.root
  const AUTH = ROUTES.AUTH.root

  const location = useLocation();
  const token = !!localStorage.getItem(constats.token);
  const tempToken = !!localStorage.getItem(constats.tempToken);
  const resetPassword = !!localStorage.getItem(constats.resetPassword);

  const extractStringsAndRoots = (obj: Record<string, any>): string[] => {
    const result: string[] = [];
    Object.values(obj).forEach((value) => {
      if (typeof value === "string") result.push(value);
      else if (typeof value === "object") result.push(...extractStringsAndRoots(value));
    });
    return result;
  };

  const authPages = extractStringsAndRoots(ROUTES.AUTH.child)

  const loginPath = buildPath(AUTH, LOGIN)
  const verifyPath = buildPath(AUTH, VERIFY)
  const emailPath = buildPath(AUTH, FORGOTPASSWORD.root, EMAIL)
  const codePath = buildPath(AUTH, FORGOTPASSWORD.root, CODE)


  const path = location.pathname.split('/').at(-1)

  // Verification checks
  if (!tempToken && path === VERIFY) return <Navigate to={loginPath} />;
  if (tempToken && path !== VERIFY) return <Navigate to={verifyPath} replace />;

  // Authentication checks
  if (!token && !authPages.includes(path)) return <Navigate to={loginPath} replace />;
  if (token && authPages.includes(path)) return <Navigate to={PROFILE} replace />;

  // Forgot Password checks
  if (!resetPassword && path === CODE) return <Navigate to={emailPath} replace />;
  if (resetPassword && path !== CODE) return <Navigate to={codePath} replace />;
  

  return <Outlet />;
};

export default AuthGuard;
