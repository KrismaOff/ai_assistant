import axios from "axios";

type sendRequestProps = {
  method: string;
  path: string;
  data: object;
  token?: string;
  callback?: (responseData: any) => void;
};

export const sendRequest = async ({ method, path, data, token, callback }: sendRequestProps): Promise<void> => {
  try {
    const response = await axios({
      method: method,
      url: process.env.REACT_APP_API_URL + path,
      data: data,
      headers: {
        "Content-Type": "application/json",
        ...(token && { "Authorization": `Bearer ${token}` })
    },
    });
    callback?.(response.data);
  } catch (error) {
    console.error("Ошибка запроса:", error.response?.data || error.message);
    if (error.response?.data) alert(error.response?.data.detail)
  }
};