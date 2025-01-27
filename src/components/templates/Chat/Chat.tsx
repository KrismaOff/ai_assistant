import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

import Message from "../Message/Message";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SendIcon from "@mui/icons-material/Send";

import FileUploadButton from "../FileUploadButton/FileUploadButton";

import useRecieveAndSendMessages from "@/hooks/useRecieveAndSendMessages";
import { isMobile } from "@/utils/isMobile";

interface Props {
  currentChat: string;
  changePage: () => void;
  onStartNewChat: () => void;
}

export default function Chat({ changePage, currentChat, onStartNewChat }: Props) {
  const { messages, setMessages, sendMessage } = useRecieveAndSendMessages(currentChat);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      if (!currentChat) onStartNewChat();
      sendMessage({ message: inputValue });
      setMessages((prev) => [
        ...(prev || []),
        { role: "user", content: inputValue, created_at: new Date().toISOString() },
      ]);
      setInputValue("");
    } else {
      alert("Перед отправкой введите сообщение!");
    }
  };

  return (
    <div className="chat-container" id="chat-container">
      <header>
        {isMobile && (
          <div onClick={changePage}>
            <KeyboardBackspaceIcon />
          </div>
        )}
        <h1>Чат с ассистентом</h1>
      </header>

      <div className="chat-body">
        {messages &&
          messages.map((message, index) => (
            <Message key={index} text={message.content} role={message.role} />
          ))}
        <div ref={chatEndRef} />
      </div>

      <div className="search-container">
        <div className="search-icon">
          <FileUploadButton />
        </div>
        <input
          type="text"
          id="user-input"
          placeholder="Введите сообщение..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="search-icon" id="message-icon" onClick={handleSendMessage}>
          <SendIcon />
        </div>
      </div>
    </div>
  );
}