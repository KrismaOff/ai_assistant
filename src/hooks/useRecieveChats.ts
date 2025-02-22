import { useState, useEffect } from "react";

import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from "@/utils/tokenCheck";

export default function useRecieveChats(currentId: string) {
  const [chatsArray, setChatsArray] = useState();

  useEffect(() => {
    sendRequest({
      method: "get",
      path: "chat/threads",
      token: tokenCheck(),
      callback: (res) => setChatsArray(res.threads),
    });
  }, [currentId]);

  return [chatsArray];
}