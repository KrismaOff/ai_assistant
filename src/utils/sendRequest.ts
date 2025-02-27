import axios from "axios";

import { removeToken } from "./tokenCheck";

type sendRequestProps = {
  method: string;
  path: string;
  data?: object;
  token?: string;
  callback?: (responseData: any) => void;
  content?: string;
};

export const sendRequest = async ({
  method,
  path,
  data,
  token,
  callback,
  content = "application/json",
}: sendRequestProps): Promise<void> => {
  try {
    const response = await axios({
      method: method,
      url: process.env.REACT_APP_API_URL + path,
      data: data,
      headers: {
        "Content-Type": content,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    callback?.(response.data);
  } catch (error) {
    console.log(error);

    if (error.response?.data.detail === "401") removeToken();
    else {
      console.error("Ошибка запроса:", error.response?.data || error.message, process.env.REACT_APP_API_URL + path);
      if (error.response?.data) alert(error.response?.data.detail);
    }
  }
};
