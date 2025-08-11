"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import { MessageInput } from "./messageInput";
import { Messages } from "./messages";

interface ChatProps {
  id: string;
}

export const Chat = ({ id }: ChatProps) => {

  const { messages, sendMessage, status } = useChat({ id });
  const isLoading = status === "submitted";
  
  const handleSendMessage = (content: string) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: content }],
    });
    if (location.pathname !== `/chat/${id}`) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  };
  return (
    <>
      <Messages messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </>

  );
};
