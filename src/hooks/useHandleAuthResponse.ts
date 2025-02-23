import { useNavigate } from "react-router-dom";
import { sendRequest } from "@/utils/sendRequest";
import { setToken, tokenCheck } from "@/utils/tokenCheck";

import { FormData } from "@/types";
import { ROUTES, buildPath } from "@/assets/data/paths";
import { constats } from "@/assets/data/constants";

export default function useHandleAuthResponse(path: string): [(data: FormData, type: string) => void] {
  const navigate = useNavigate();

  const {
    AUTH,
    PROFILE,
    AUTH: {
      child: { LOGIN, REGISTER, VERIFY, FORGOTPASSWORD },
    },
  } = ROUTES;

  const { tempToken, token, resetPassword } = constats;

  const handleCallback = (res: any, type: string, data?: string): void => {
    if (!res) return;

    switch (type) {
      case REGISTER:
        setToken(tempToken, res.temp_token); // localStorage.setItem(tempToken, res.temp_token);
        navigate(buildPath(AUTH.root, VERIFY));
        break;
      case LOGIN:
        setToken(token, res.access_token); // localStorage.setItem(token, res.access_token);
        navigate(buildPath(PROFILE.root));
        break;
      case VERIFY:
        alert(res.message);
        localStorage.removeItem(tempToken);
        setToken(token, res.access_token); // localStorage.setItem(token, res.access_token);
        navigate(buildPath(PROFILE.root));
        break;
      case FORGOTPASSWORD.root:
        alert(res.message);
        localStorage.setItem(resetPassword, data);
        navigate(buildPath(AUTH.root, FORGOTPASSWORD.root, FORGOTPASSWORD.child.CODE));
        break;
      case FORGOTPASSWORD.child.CODE:
        alert(res.message);
        localStorage.removeItem(resetPassword);
        navigate(buildPath(AUTH.root, LOGIN));
        window.location.reload()
        break;

      default:
        console.warn(`Неизвестный тип: ${type}`);
    }
  };

  const submit = (data: FormData, type: string): void => {
    const mods = {
      method: "post",
      path: path,
      data: data,
    };

    sendRequest({
      ...mods,
      token: tokenCheck(),
      callback: (res: any) => handleCallback(res, type, data.email),
    });
  };

  return [submit];
}
