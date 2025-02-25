import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

import { Button } from "@mui/material";

import Message from "../Message/Message";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SendIcon from "@mui/icons-material/Send";

import FileUploadButton from "../FileUploadButton/FileUploadButton";
import AutoResizingTextarea from "../AutoResizingTextarea/AutoResizingTextarea";

import useRecieveAndSendMessages from "@/hooks/useRecieveAndSendMessages";
import { isMobile } from "@/utils/isMobile";

interface Props {
  currentId: string;
  changePage: () => void;
  onStartNewChat: () => void;
}

export default function Chat({ changePage, currentId, onStartNewChat }: Props) {
  const { messages, setMessages, loading, setLoading, sendMessage } = useRecieveAndSendMessages(currentId);
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentId && pendingMessage) {
      sendMessage(pendingMessage.text, pendingMessage.file);
      setPendingMessage(null); 
    }
  }, [currentId]);

  const [pendingMessage, setPendingMessage] = useState<{ text: string; file: File | null } | null>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setLoading(true);
      if (!currentId) {
        onStartNewChat(); 
        setPendingMessage({ text: inputValue, file: selectedFile }); 
      } else {
        sendMessage(inputValue, selectedFile); 
      }
  
      setMessages((prev) => [
        ...(prev || []),
        { role: "user", content: inputValue, created_at: new Date().toISOString(), id: "userWaiting" },
        { role: "assistant", content: "", created_at: new Date().toISOString(), waiting: true, id: "assistantWaiting" }
      ]);
  
      setInputValue("");
      setSelectedFile(null);
    } else {
      alert("Перед отправкой введите сообщение!");
    }
  };
  return (
    <div className="chat-container" id="chat-container">
      Текущий чат: {currentId}
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
            <Message key={index} text={message.content} role={message.role} waiting={message.waiting} url={message.document_download_url} />
          ))}
        <div ref={chatEndRef} />
      </div>

      <div className="search-container">
        <div className="search-icon">
          <FileUploadButton file={selectedFile} setFile={setSelectedFile} />
        </div>
        <AutoResizingTextarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Button
          className="search-icon"
          onClick={handleSendMessage}
          loading={loading}
          color="inherit"
          loadingPosition="end"
        >
          <SendIcon />
        </Button>
      </div>
    </div>
  );
}