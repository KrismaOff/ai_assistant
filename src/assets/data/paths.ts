// "homepage": "https://babu6hkaboy-lawgpt-react-ea1d.twc1.net",
export const ROUTES = {
  HOME: {
    root: "",
  },
  PROFILE: {
    root: "profile",
  },
  AUTH: {
    root: "auth",
    child: {
      LOGIN: "login",
      REGISTER: "register",
      VERIFY: "verify",
      FORGOTPASSWORD: {
        root: "forgot-password",
        child: {
          EMAIL: "email-confirmation",
          CODE: "reset-password",
        },
      },
    },
  },
  CHAT: {
    root: "chat",
  },
};

export const buildPath = (root: string, ...children: string[]): string => {
  const sanitizedParts = [root, ...children].filter(Boolean);
  // return `/${sanitizedParts.join("/")}`;
  return `${ROUTES.HOME.root}/${sanitizedParts.join("/")}`;
};

// import { ROUTES, buildPath } from "@/assets/data/paths";720871
