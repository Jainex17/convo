"use client";

import { useEffect, useState, use, useRef } from "react";
import { Chat } from "@/components/Chat";
import { MessageInput } from "@/components/MessageInput";
import { useChat } from "@ai-sdk/react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const chatId = resolvedParams.id;

  const hasInitialized = useRef(false);
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    id: chatId,
  });

  useEffect(() => {
    const storedMessage = sessionStorage.getItem("initialMessage");
    setInitialMessage(storedMessage);
  }, []);

  useEffect(() => {
    if (initialMessage && !hasInitialized.current) {
      console.log(initialMessage);
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: initialMessage }],
      });
      hasInitialized.current = true;
      sessionStorage.removeItem("initialMessage");
    }
  }, [initialMessage, sendMessage]);

  const isLoading = status === "submitted";

  const handleSendMessage = (content: string) => {
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: content }],
    });
  };

  return (
    <div className="w-full h-[calc(100vh-14px)]">
      <Chat messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
