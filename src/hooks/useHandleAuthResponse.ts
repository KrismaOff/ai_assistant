import { useNavigate } from "react-router-dom";
import { sendRequest } from "@/utils/sendRequest";
import { FormData } from "@/types";

export default function useHandleAuthResponse(path: string): [(data: FormData, type: string) => void] {
  const navigate = useNavigate();

  const handleCallback = (res: any, type: string): void => {
    if (!res) return;

    switch (type) {
      case "reg":
        localStorage.setItem("tempToken", res.temp_token);
        navigate("/auth/verify");
        break;
      case "log":
        // localStorage.removeItem("tempToken");
        localStorage.setItem("token", res.access_token);
        navigate("/profile");
        break;
      case "verify":
        alert(res.message);
        localStorage.removeItem("tempToken");
        localStorage.setItem("token", res.access_token);
        navigate("/profile");
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
      token:
        type === "verify"
          ? localStorage.getItem("tempToken")
          : undefined,
      callback: (res: any) => handleCallback(res, type),
    });
  };

  return [submit];
}
