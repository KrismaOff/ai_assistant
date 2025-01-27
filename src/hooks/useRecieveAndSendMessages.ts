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
    setMessages([
      {
        role: "user",
        content: "hello!",
        created_at: "..."
      }, 
      {
        role: "assistant",
        content: "hello!",
        created_at: "..."
      },
      {
        role: "assistant",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi nibh, posuere sit amet diam ac, eleifend mollis ex. Curabitur sed eleifend tellus. Nulla vestibulum sollicitudin euismod. Etiam mauris tortor, interdum id volutpat eget, condimentum sit amet magna. Etiam vulputate ac elit vitae dapibus. Donec odio neque, elementum quis turpis vel, suscipit hendrerit erat. Maecenas volutpat pulvinar nulla sed dignissim. Suspendisse at purus urna. Mauris a tortor in augue mollis sollicitudin eu vel ante. Vivamus vel vehicula est, at mollis urna. Ut congue vulputate risus, ut tristique nibh rutrum ut. Nunc augue ante, sodales ultrices nunc id, mattis eleifend velit. Fusce ultricies risus lectus. Donec a urna in mi fermentum bibendum. Aliquam erat volutpat. Nunc dictum nunc ut diam volutpat bibendum. Integer eget ultricies libero. Nulla finibus, mauris ut aliquet bibendum, sapien mi mollis augue, ut rutrum quam massa ut ante. Nulla eu pretium dui. Curabitur mattis maximus diam, et ullamcorper ante laoreet in. Vivamus pellentesque, lacus vitae vestibulum luctus, mi justo commodo urna, id feugiat nunc augue eget nunc. In a magna at lacus congue dapibus sed ac massa. Fusce non felis sapien. Phasellus ut iaculis libero, non aliquet tellus. Nulla luctus eros eu neque euismod, eu maximus tortor sagittis. Donec eu orci ac ante vulputate finibus. Nunc ut turpis laoreet, cursus dui eget, laoreet nisi. Donec non massa rhoncus, porta justo eu, cursus lacus. Praesent posuere vestibulum ipsum, laoreet sollicitudin felis maximus vel. Pellentesque congue vestibulum odio, cursus dapibus est fringilla non. Morbi pellentesque et tortor non semper.",
        created_at: "..."
      },
      {
        role: "user",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi nibh, posuere sit amet diam ac, eleifend mollis ex. Curabitur sed eleifend tellus. Nulla vestibulum sollicitudin euismod. Etiam mauris tortor, interdum id volutpat eget, condimentum sit amet magna. Etiam vulputate ac elit vitae dapibus. Donec odio neque, elementum quis turpis vel, suscipit hendrerit erat. Maecenas volutpat pulvinar nulla sed dignissim. Suspendisse at purus urna. Mauris a tortor in augue mollis sollicitudin eu vel ante. Vivamus vel vehicula est, at mollis urna. Ut congue vulputate risus, ut tristique nibh rutrum ut. Nunc augue ante, sodales ultrices nunc id, mattis eleifend velit. Fusce ultricies risus lectus. Donec a urna in mi fermentum bibendum. Aliquam erat volutpat. Nunc dictum nunc ut diam volutpat bibendum. Integer eget ultricies libero. Nulla finibus, mauris ut aliquet bibendum, sapien mi mollis augue, ut rutrum quam massa ut ante. Nulla eu pretium dui. Curabitur mattis maximus diam, et ullamcorper ante laoreet in. Vivamus pellentesque, lacus vitae vestibulum luctus, mi justo commodo urna, id feugiat nunc augue eget nunc. In a magna at lacus congue dapibus sed ac massa. Fusce non felis sapien. Phasellus ut iaculis libero, non aliquet tellus. Nulla luctus eros eu neque euismod, eu maximus tortor sagittis. Donec eu orci ac ante vulputate finibus. Nunc ut turpis laoreet, cursus dui eget, laoreet nisi. Donec non massa rhoncus, porta justo eu, cursus lacus. Praesent posuere vestibulum ipsum, laoreet sollicitudin felis maximus vel. Pellentesque congue vestibulum odio, cursus dapibus est fringilla non. Morbi pellentesque et tortor non semper.",
        created_at: "..."
      },
      {
        role: "assistant",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nisi nibh, posuere sit amet diam ac, eleifend mollis ex. Curabitur sed eleifend tellus. Nulla vestibulum sollicitudin euismod. Etiam mauris tortor, interdum id volutpat eget, condimentum sit amet magna. Etiam vulputate ac elit vitae dapibus. Donec odio neque, elementum quis turpis vel, suscipit hendrerit erat. Maecenas volutpat pulvinar nulla sed dignissim. Suspendisse at purus urna. Mauris a tortor in augue mollis sollicitudin eu vel ante. Vivamus vel vehicula est, at mollis urna. Ut congue vulputate risus, ut tristique nibh rutrum ut. Nunc augue ante, sodales ultrices nunc id, mattis eleifend velit. Fusce ultricies risus lectus. Donec a urna in mi fermentum bibendum. Aliquam erat volutpat. ",
        created_at: "..."
      },
    ])
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
