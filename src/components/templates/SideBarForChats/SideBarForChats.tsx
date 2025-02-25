// Sidebar.tsx
import React from "react";
import "./SideBarForChats.css";

import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import Banner from "../Banner/Banner";

interface Chat {
  id: string;
  created_at: string;
  first_message: string;
}

interface Props {
  chats: Chat[];
  onStartNewChat?: () => void;
  onSelectChat?: (chatId: string) => void;
}

const SidebarForChats: React.FC<Props> = ({ chats, onStartNewChat, onSelectChat }) => {

  // console.log(chats && chats.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));

  return (
    <div className="chat-sidebar">
      <Banner />

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
          </div>
          <div className="chat-list-items-cont">
            <ul id="chat-list-items">
              {chats && chats.length > 0 ? (
                chats.reverse().map((chat) => (
                  <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
                    <div className="chat-list-items-name">
                      <LocalPostOfficeIcon />
                    <p>{chat.first_message}</p>
                    </div>
                    <div className="chat-list-items-data">
                    <small>
                      {new Date(chat.created_at).toLocaleString().split(",")[0]}
                    </small>
                    </div>
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
