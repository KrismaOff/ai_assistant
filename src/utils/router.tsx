import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "@/components/pages/App/App";
import AuthForm from "@/components/pages/AuthForm/AuthForm";
import VerifyForm from "@/components/pages/VerifyForm/VerifyForm";
import Profile from "@/components/pages/Profile/Profile";
import ParentPage from "@/components/pages/ParentPage/ParentPage";
import ChatPage from "@/components/pages/ChatPage/ChatPage";

import AuthGuard from "@/components/layout/AuthGuard/AuthGuard";

import { ROUTES } from "@/assets/data/paths";

const {
  CHAT,
  AUTH,
  HOME,
  PROFILE,
  AUTH: {
    child: { LOGIN, REGISTER, VERIFY, FORGOTPASSWORD, FORGOTPASSWORD: { child: {EMAIL, CODE} } },
  },
  
} = ROUTES;
export const router = createBrowserRouter([
  {
    path: HOME.root,
    element: <App />,
    errorElement: <div>404 - Not Found "{window.location.pathname}"</div>,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: AUTH.root,
            children: [
              {
                path: LOGIN,
                element: <AuthForm type={LOGIN} />,
              },
              {
                path: REGISTER,
                element: <AuthForm type={REGISTER} />,
              },
              {
                path: VERIFY,
                element: <VerifyForm type={VERIFY} />,
              },
              {
                path: FORGOTPASSWORD.root,
                // element: <ForgotPassword/>,
                children: [
                  {
                    path: EMAIL,
                    element: <AuthForm type={FORGOTPASSWORD.root}/>
                  },
                  {
                    path: CODE,
                    element: <AuthForm type={FORGOTPASSWORD.child.CODE}/>
                  },
                ],
              },
            ],
          },
          {
            element: <ParentPage />,
            children: [
              {
                path: PROFILE.root,
                element: <Profile type={PROFILE.root}/>,
              },
              {
                path: CHAT.root,
                element: <ChatPage/>,
              },
            ]
          },
        ],
      },
    ],
  },
]);