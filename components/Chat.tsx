"use client";

import React from "react";
import type { UIMessage } from 'ai';

interface ChatProps {
  messages: UIMessage[];
  isLoading: boolean;
}

export const Chat = ({ messages, isLoading }: ChatProps) => {

  return (
    <div className="w-full pt-10 pb-[12rem]">
      <div className="w-2/3 mx-auto space-y-4">
        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 text-sm leading-relaxed shadow-xs transition-colors ${
                  isUser ? "bg-secondary text-secondary-foreground" : "bg-transparent"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.parts?.map((part, partIndex) => {
                    if (part.type === 'text') {
                      return <p key={partIndex}>{part.text}</p>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex w-full gap-3 justify-start">
            <div className="rounded-lg px-4 py-2 text-sm leading-relaxed shadow-xs transition-colors bg-muted">
              <div className="flex items-center gap-2">
                <div className="animate-pulse">Thinking...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
