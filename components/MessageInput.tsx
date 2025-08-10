"use client";

import { useState, FormEvent } from "react";

import { Textarea } from "@/components/ui/textarea";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import { ArrowDown, ArrowDown10, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { models } from "@/hooks/models";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { isMobile, open, openMobile, state } = useSidebar();
  const isSidebarOpen = isMobile ? openMobile : open;

  const MIN_ROWS = 2;
  const MAX_ROWS = 14;
  const LINE_HEIGHT_PX = 24;

  function autosize(el: HTMLTextAreaElement) {
    const minPx = MIN_ROWS * LINE_HEIGHT_PX;
    const maxPx = MAX_ROWS * LINE_HEIGHT_PX;
    el.style.height = "auto";
    const next = Math.min(Math.max(el.scrollHeight, minPx), maxPx);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxPx ? "auto" : "hidden";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
  }
  

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div
        className={`w-full flex justify-center items-center transition-all duration-300 ${
          isSidebarOpen ? "pl-(--sidebar-width)" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-t-2xl w-2/3 border border-(var(--border)) bg-input/20 backdrop-blur"
        >
          <div className="flex flex-col">
            <Textarea
              value={message}
              onChange={(e) => {
                setMessage(e.currentTarget.value);
                autosize(e.currentTarget);
              }}
              placeholder="Type your message here..."
              rows={MIN_ROWS}
              style={{ backgroundColor: "transparent" }}
              className="w-full resize-none border-0 pt-4 px-4 text-base md:text-base leading-6 focus-visible:ring-0 focus-visible:border-0"
            />

            <div className="flex items-center justify-end mx-3 mb-4 gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="py-5 cursor-pointer flex items-center">
                   {models[0].name}
                   
                   <span className="pt-1">
                    <ChevronDown className="size-4" />
                   </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background"> 
                  {models.map((model) => (
                    <DropdownMenuItem key={model.name} className="cursor-pointer px-6 py-2">
                      {model.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="secondary" className="py-5 cursor-pointer">
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
