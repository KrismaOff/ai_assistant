import { useState, useEffect } from "react";
import axios from "axios";

import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from "@/utils/tokenCheck";

export default function useRecieveAndSendMessages(currentId: string) {
  interface MessagesGet {
    role: "user" | "assistant";
    content: string;
    created_at: string;
  }

  const [messages, setMessages] = useState<MessagesGet[]>();

  const sendMessage = (data: any) => {
    if (currentId)
      sendRequest({
        method: "post",
        path: `api/chat/${currentId}/send_message`, // https://babu6hkaboy-lawgpt-fastapi-version-1733.twc1.net/...
        data: data, // { message: "..." }
        token: tokenCheck(),
        callback: (res) => setMessages(res.response),
      });
  };

  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/api/thread/thread_e3e9d4b6d4af40139409a939db1e79b5/messages`, {
      headers: {
        Authorization: `Bearer ${tokenCheck()}`,
      },
    })
    .then((response) => {
      console.log("Сообщения:", response.data);
    })
    .catch((error) => {
      console.error("Ошибка при получении сообщений:", error);
    });
    // if (currentId)
    // sendRequest({
    //   method: "get",
    //   path: `api/thread/${currentId}/messages`,
    //   token: tokenCheck(),
    //   callback: (res) => {
    //     console.log(res);
    //     setMessages(res.messages)
    //   },
    // });
  }, [currentId]);

  return { messages, setMessages, sendMessage };
}
