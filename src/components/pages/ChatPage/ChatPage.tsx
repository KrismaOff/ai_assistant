import React, { useState } from "react";
import "./ChatPage.css";

import SidebarForChats from "@/components/templates/SideBarForChats/SideBarForChats";
import Chat from "@/components/templates/Chat/Chat";

import useHandleNewChat from "@/hooks/useHandleNewChat";
import useRecieveChats from "@/hooks/useRecieveChats";

import { isMobile } from "@/utils/isMobile";

export default function ChatPage() {
  const [currentId, setCurrentId, onStartNewChat, update] = useHandleNewChat();
  const [chatsArray] = useRecieveChats(update);

  const [compVis, setCompVis] = useState({
    sidebar: true,
    chat: isMobile ? false : true,
  });

  const toggleComponents = (chatId?: string) => {
    if (!isMobile) {
      if (chatId) setCurrentId(chatId);
      else if (currentId) onStartNewChat()
    } else {
      setCompVis({
        sidebar: false,
        chat: true,
      });
      if (chatId) setCurrentId(chatId);
      else onStartNewChat();
    }
  };

  const changePageMob = () => {
    setCompVis({
      sidebar: true,
      chat: false,
    });
    setCurrentId("")
  }

  const startNewChat = () => toggleComponents();
  const selectChat = (chatId: string) => toggleComponents(chatId);

  return (
    <div className="chat">
      {compVis.sidebar && (
        <SidebarForChats
          chats={chatsArray}
          onStartNewChat={startNewChat}
          onSelectChat={selectChat}
        />
      )}
      {compVis.chat && (
        <Chat changePage={changePageMob} currentChat={currentId} onStartNewChat={onStartNewChat} />
      )}
    </div>
  );
}
