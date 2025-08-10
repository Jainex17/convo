import React from "react";
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const fakeMessages: Message[] = [
  {
    id: "m2",
    role: "user",
    content: "Write a short tweet about learning Next.js with shadcn/ui.",
  },
  {
    id: "m3",
    role: "assistant",
    content:
      "Leveling up with Next.js + shadcn/ui ⚡️. Building fast, accessible UIs has never been easier. Loving the dev experience! #Nextjs #shadcn #React",
  },
  {
    id: "m4",
    role: "user",
    content: "Nice. Can you also give me 3 bullet ideas for a blog intro?",
  },
  {
    id: "m5",
    role: "assistant",
    content:
      "- Why component ergonomics matter for velocity\n- How design systems unlock consistency\n- Tips to ship features faster with great UX",
  },
  {
    id: "m6",
    role: "assistant",
    content:
      "Leveling up with Next.js + shadcn/ui ⚡️. Building fast, accessible UIs has never been easier. Loving the dev experience! #Nextjs #shadcn #React",
  },
  {
    id: "m7",
    role: "user",
    content: "Nice. Can you also give me 3 bullet ideas for a blog intro?",
  },
  {
    id: "m8",
    role: "assistant",
    content:
      "- Why component ergonomics matter for velocity\n- How design systems unlock consistency\n- Tips to ship features faster with great UX",
  },
  {
    id: "m9",
    role: "assistant",
    content:
      "Leveling up with Next.js + shadcn/ui ⚡️. Building fast, accessible UIs has never been easier. Loving the dev experience! #Nextjs #shadcn #React",
  },
  {
    id: "m10",
    role: "user",
    content: "Nice. Can you also give me 3 bullet ideas for a blog intro?",
  },
  {
    id: "m11",
    role: "assistant",
    content:
      "- Why component ergonomics matter for velocity\n- How design systems unlock consistency\n- Tips to ship features faster with great UX",
  },
];

export const Chat = () => {
  return (
    <div className="w-full pt-10 pb-[12rem]">

      <div className="w-2/3 mx-auto space-y-4">
        {fakeMessages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex w-full gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 text-sm leading-relaxed shadow-xs transition-colors ${
                  isUser && "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content.split("\n").map((line, idx) => (
                  <p key={idx} className={idx > 0 ? "mt-2" : undefined}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
