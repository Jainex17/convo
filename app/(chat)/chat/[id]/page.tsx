import Chat from "@/components/Chat";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { UIMessage, UIMessagePart } from "ai";
import { headers } from "next/headers";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const session = await auth.api.getSession({ headers: await headers()});

  let initialMessages: UIMessage[] = [];
  if(session) {
    const allMsg = await prisma.message.findMany({
      where: { chatId: id },
      orderBy: { createdAt: "asc" },
    });

    if(allMsg) {
      initialMessages = allMsg.map((message) => ({
        id: message.id,
        role: message.role as "user" | "system" | "assistant",
        parts: (() => {
          try {
            const arr = JSON.parse(message.parts as string);
            return Array.isArray(arr) ? arr as UIMessagePart<any, any>[] : [];
          } catch {
            return [];
          }
        })(),
      }));
    }
  }

  return (
    <div className="w-full min-h-screen">
      <Chat id={id} initialMessages={initialMessages}/>
    </div>
  );
}