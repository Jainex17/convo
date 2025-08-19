"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { Button } from "./ui/button"
import Link from "next/link"
import { SidebarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "@/lib/auth/auth-client"
import { useState, useEffect } from "react"
import { Chat } from "@prisma/client"

export function AppSidebar() {
  const { 
    open,    
    setOpen,
  } = useSidebar()
  
  const router = useRouter();
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  
  useEffect(() => {
      const fetchChats = async () => {
        const response = await fetch("/api/chat");
        const data = await response.json();
        setChats(data);
    }
    fetchChats();
  }, []);


  return (
    <Sidebar className="select-none" variant="floating">
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center px-1">
            <Link href="/" className="text-xl font-medium">Convo</Link>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mx-2 sidebar">
        <SidebarGroup>
        <div className="flex justify-center items-center pb-4">
          <Button variant="default" className="w-full cursor-pointer"
          onClick={() => {
            router.push(`/`);
          }}
          >New Chat</Button>
        </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats && chats.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${item.id}`}>
                      <span className="py-3 text-xs text-foreground/80">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-3">
        {session?.user && <NavUser user={session.user} />}
      </SidebarFooter>
      {!open && (
        <div className="fixed top-3 left-3">
          <Button variant="secondary" onClick={() => setOpen(!open)}>
            <SidebarIcon />
          </Button>
        </div>
      )}
    </Sidebar>
  )
}