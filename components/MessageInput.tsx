"use client";

import { useState, FormEvent, useRef, useEffect } from "react";

import { Textarea } from "@/components/ui/textarea";
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
import {
  ArrowDown,
  ArrowDown10,
  ArrowUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { models } from "@/hooks/models";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile, open, openMobile, state } = useSidebar();
  const isSidebarOpen = isMobile ? openMobile : open;

  const MIN_ROWS = 2;
  const MAX_ROWS = 14;
  const LINE_HEIGHT_PX = 24;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  function autosize(el: HTMLTextAreaElement) {
    const minPx = MIN_ROWS * LINE_HEIGHT_PX;
    const maxPx = MAX_ROWS * LINE_HEIGHT_PX;
    el.style.height = "auto";
    const next = Math.min(Math.max(el.scrollHeight, minPx), maxPx);
    el.style.height = `${next}px`;
    el.style.overflowY = el.scrollHeight > maxPx ? "auto" : "hidden";
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(message);
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
          className="rounded-t-2xl w-2/3 border border-(var(--border)) bg-input/10 backdrop-blur-xl"
        >
          <div className="flex flex-col">
            <Textarea
              value={message}
              onChange={(e) => {
                setMessage(e.currentTarget.value);
                autosize(e.currentTarget);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
                }
              }}
              placeholder="Type your message here..."
              rows={MIN_ROWS}
              style={{ backgroundColor: "transparent" }}
              className="w-full resize-none border-0 pt-4 px-4 text-base md:text-base leading-6 focus-visible:ring-0 focus-visible:border-0"
            />

            <div className="flex items-center justify-end mx-3 mb-4 gap-1">
              <div className="relative" ref={dropdownRef}>
                <Button
                  type="button"
                  variant="ghost"
                  className="cursor-pointer flex items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {selectedModel.name}
                  <span className="pt-1">
                    <ChevronDown
                      className={`size-4 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </Button>

                {isDropdownOpen && (
                  <div className="absolute bottom-full w-40 mb-1 left-0 min-w-full bg-background border border-border rounded-md shadow-lg z-50">
                    {models.map((model) => (
                      <div
                        key={model.name}
                        className="cursor-pointer text-base px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors first:rounded-t-md last:rounded-b-md"
                        onClick={() => {
                          setSelectedModel(model);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {model.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
