import { useState } from "react";

import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from "@/utils/tokenCheck";

export default function useHandleProfileRequest() {

  const [currentId, setCurrentId] = useState<any>();
  const [update, setUpdate] = useState(false)

  const onStartNewChat = () => {
    setUpdate(true);
    sendRequest({
      method: "post",
      path: "create_thread",
      token: tokenCheck(),
      callback: (res) => {
        console.log("Новый чат создан - ", res.thread_id);
        setCurrentId(res.thread_id);
        setUpdate(false);
      },
    });
  };

  return [currentId, setCurrentId, onStartNewChat, update];
}
