"use client";

import { Chat } from '@/components/Chat'
import { MessageInput } from '@/components/MessageInput'
import { useChat } from '@ai-sdk/react'

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    id: "main",
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSendMessage = (content: string) => {
    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text: content }],
    });
  };

  return (
    <div className="w-full min-h-screen">
      <Chat messages={messages} isLoading={isLoading} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}