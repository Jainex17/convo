"use client";

import { MessageInput } from '@/components/MessageInput'
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  function handleSendMessage(message: string) {
    const chatId = crypto.randomUUID();
    
    sessionStorage.setItem('initialMessage', message);
    router.push(`/chat/${chatId}`);
  }

  return (
    <div className="w-full min-h-screen">
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}