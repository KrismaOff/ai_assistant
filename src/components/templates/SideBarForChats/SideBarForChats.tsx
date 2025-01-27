// Sidebar.tsx
import React from "react";
import "./SideBarForChats.css";

import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import Banner from "../Banner/Banner";

interface Chat {
  id: string;
  created_at: string;
  thread_name: string;
}

interface Props {
  chats: Chat[];
  onStartNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
}

const SidebarForChats: React.FC<Props> = ({
  chats,
  onStartNewChat,
  onSelectChat,
}) => {
  return (
    <div className="chat-sidebar">
      <Banner/>

      <div className="chat-sidebar-chats">
        <div className="chat-sidebar-newchat">
          <h1>Chats</h1>
          <button className="btn-pro" onClick={onStartNewChat}>
            New Chat
          </button>
        </div>

        <div className="chat-list">
          <div className="chat-list-title">
            <h2>History</h2>
            {/* <button>⋮</button> */}
          </div>
          <div className="chat-list-items-cont">
          <ul id="chat-list-items">
          {chats && chats.length > 0 ? (
              chats.reverse().map((chat) => (
                <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
                    <LocalPostOfficeIcon/>
                  <p>{chat.thread_name}</p>
                  <small>
                    Создано: {new Date(chat.created_at).toLocaleString()}
                  </small>
                </li>
              ))
            ) : (
              <li>У вас пока нет активных чатов.</li>
            )}
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarForChats;
