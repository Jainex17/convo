"use client";

import Chat from "@/components/Chat";

export default function Page() {
  const chatId = crypto.randomUUID();

  return (
    <div className="w-full min-h-screen">
      <Chat id={chatId} initialMessages={[]}/>
    </div>
  );
}