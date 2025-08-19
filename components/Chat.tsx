"use client";

import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { MessageInput } from "./MessageInput";
import { Messages } from "./Messages";
import { UIMessage } from "ai";

interface ChatProps {
  id: string;
  initialMessages: UIMessage[];
}

const Chat = ({ id, initialMessages }: ChatProps) => {
  const lastSavedCount = useRef(initialMessages.length);
  const isSaving = useRef(false);

  const { messages, sendMessage, status } = useChat({ 
    id,
    messages: initialMessages,
   });
  const isLoading = status === "submitted";

  useEffect(() => {
    const saveMessages = async () => {
      const lastMessage = messages[messages.length - 1];
      const isAssistantDone = lastMessage?.role === 'assistant' && 
        lastMessage.parts?.some((part: any) => part.state === 'done' || part.state === undefined);

      if (
        messages.length > lastSavedCount.current &&
        messages.length >= 2 &&
        isAssistantDone &&
        !isLoading &&
        !isSaving.current
      ) {
        isSaving.current = true;
        
        try {
          const response = await fetch(`/api/chat/${id}`, {
            method: "POST",
            body: JSON.stringify({ messages }),
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          lastSavedCount.current = messages.length;
        } catch (error) {
          console.error("Error saving messages:", error);
        } finally {
          isSaving.current = false;
        }
      }
    };

    saveMessages();
  }, [messages, isLoading, id]);
  
  const handleSendMessage = (content: string) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: content }]
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

export default Chat;