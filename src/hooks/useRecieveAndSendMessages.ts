import { useState, useEffect } from "react";

import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from "@/utils/tokenCheck";

export default function useRecieveAndSendMessages(currentId: string) {
  interface MessagesGet {
    role: "user" | "assistant";
    content: string;
    created_at: string;
    document_download_url?: "string";
    waiting?: boolean;
    id? : "userWaiting" | "assistantWaiting";
  }

  // interface MessageRequestWithoutFile {
  //   assistant_response:string,
  // }

  // interface MessageRequestWithFile extends MessageRequestWithoutFile {
  //   recognized_text?: string,
  //   file_name?: string,
  //   file_path?: string
  // }
  
  const [chat, setChat] = useState(currentId)
  const [messages, setMessages] = useState<MessagesGet[]>();
  const [loading, setLoading] = useState(false);

  const sendMessage = (data: any, file?: File) => {
    const resultData = new FormData();
    resultData.append("query", data);
    file && resultData.append("file", file);
    if (currentId)
      console.log("Данные отправлены - ", {
        method: "post",
        path: `chat/${currentId}`,
        token: tokenCheck(),
      });
      sendRequest({
        method: "post",
        path: `chat/${currentId}`,
        data: resultData,
        token: tokenCheck(),
        content: "multipart/form-data",
        callback: (res) => {
          setMessages((prevMessages) => {
            return [
              ...prevMessages.slice(0, -1),
              {
                role: "assistant",
                content: res.assistant_response,
                created_at: new Date().toISOString(),
                ...(res.document_download_url && {document_download_url: res.document_download_url})
              },
            ];
          });
          setLoading(false)
        },
      });
  };

  useEffect(() => {
    if (currentId && !loading) {
      if (chat && chat !== currentId) {
        setMessages([])
        setChat(currentId)
      }
      sendRequest({
        method: "get",
        path: `messages/${currentId}`,
        token: tokenCheck(),
        callback: (res) => {
          console.log("Данные получены - ", res);
          setMessages(res.messages);
        },
      });
    }
  }, [currentId, loading]);

  return { messages, setMessages, loading, setLoading, sendMessage };
}
