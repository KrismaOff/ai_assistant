import React from "react"
import { createBrowserRouter } from "react-router-dom";

import App from "@/components/pages/App/App";
import AuthForm from "@/components/pages/AuthForm/AuthForm";
import VerifyForm from "@/components/pages/VerifyForm/VerifyForm";
import Profile from "@/components/pages/Profile/Profile";

import AuthGuard from "@/components/layout/AuthGuard/AuthGuard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Not Found</div>,
        children: [
            {
                element: <AuthGuard />,
                children: [
                    {
                        path: "/auth",
                        children: [
                            {
                                path: "login",
                                element: <AuthForm isRegister={false} />
                            },
                            {
                                path: "register",
                                element: <AuthForm isRegister={true} />
                            },
                            {
                                path: 'verify',
                                element: <VerifyForm />
                            }
                        ]
                    },
                    {
                        path: "/profile",
                        element: <Profile />
                    }
                ]
            }
        ]
    }
])

// 1. Если tempToken имеется
// Можно открыть только страничку Verify
// При открытие других страниц - перенос на страничку Verify

// 2. Если token имеется
// Можно открывать и перемещаться по всем страничкам (Profile)
// При открытие других страниц (login, register, verify) - перенос на страничку profile, либо нет доступа

// Страничка login
// tempToken - нет
// token - нет

// Страничка register
// tempToken - нет
// token - нет

// Страничка Verify
// tempToken - да
// token - нет

// Страничка Profile
// tempToken - нет
// token - да
