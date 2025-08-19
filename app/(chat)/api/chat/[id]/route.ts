import { generateTitleFromUserMessage } from "@/app/(chat)/action";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { UIMessage, UIMessagePart } from "ai";
import { CloudCog } from "lucide-react";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chatId = (await params).id;

  const chat = await prisma.chat.findFirst({
    where: { id: chatId, userId: session.user.id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });

  if (!chat) {
    return NextResponse.json({ chat: null, messages: [] });
  }

  const messages: UIMessage[] = chat.messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "system" | "assistant",
    parts: message.parts as UIMessagePart<any, any>[] || [],
  }));

  return NextResponse.json({ chat: { id: chat.id, title: chat.title, updatedAt: chat.updatedAt }, messages });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) { return new NextResponse("Unauthorized", { status: 401 }); }
  
  const body = await request.json();
  const { messages } = body as { messages: UIMessage[] };
  const chatId = (await params).id;
  
  if(!Array.isArray(messages) || messages.length === 0) { 
    return new NextResponse("Invalid request", { status: 400 }); 
  }
  
  try {
    await prisma.$transaction(async (tx) => {
      const existingChat = await tx.chat.findFirst({
        where: { id: chatId, userId: session.user.id },
        include: { messages: { take: 1 } }
      });

      if (!existingChat) {
        const firstUserMessage = messages.find(item => {
          const message = (item as any).message || item;
          return message.role === 'user';
        });
        let title = "New Chat";
        
        if (firstUserMessage) {
          try {
            const message = (firstUserMessage as any).message || firstUserMessage;
            title = await generateTitleFromUserMessage({ message });
          } catch (error) {
            console.error("Error generating title:", error);
            const message = (firstUserMessage as any).message || firstUserMessage;
            const firstTextPart = message.parts?.find((part: any) => part.type === 'text');
            title = firstTextPart?.text 
              ? firstTextPart.text.slice(0, 50) + (firstTextPart.text.length > 50 ? '...' : '')
              : "New Chat";
          }
        }

        try {
          await tx.chat.create({
            data: {
              id: chatId,
              userId: session.user.id,
              title: title,
            },
          });
        } catch (error: any) {
          console.error("Error creating chat:", error);
        }
      }

      const existingMessages = await tx.message.findMany({
        where: { chatId: chatId },
        select: { id: true }
      });
      
      const messagesToSave = messages.map((item) => {
        const message = (item as any).message || item;
        console.log("--------------------------------");
        console.log(message.role);
        console.log(message.parts[0]);
        console.log(message.parts[1]);
        console.log("--------------------------------");
        const parts = message.role == "user" ? message.parts[0] : message.parts[1];

        return {
          id: message.id, 
          chatId: chatId,
          role: message.role,
          parts: JSON.stringify(parts ?? []),
        };
      });
      
      const newMessages = messagesToSave.filter(msg => 
        !existingMessages.some(existing => existing.id === msg.id)
      );

      if (newMessages.length > 0) {
        await tx.message.createMany({
          data: newMessages,
        });
      }

      await tx.chat.update({
        where: { id: chatId },
        data: { updatedAt: new Date() },
      });
    });
    
    return NextResponse.json({ 
      chat: { id: chatId, updatedAt: new Date() },
      success: true 
    });
  } catch (error) {
    console.error("Error saving chat:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}