"use client";

import { useRef } from "react";
import Chat from "@/components/Chat";

export default function Page() {
  const chatIdRef = useRef<string>(crypto.randomUUID());
  const chatId = chatIdRef.current;

  return (
    <div className="w-full min-h-screen">
      <Chat id={chatId}/>
    </div>
  );
}