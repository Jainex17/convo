import { Calendar, Home, Inbox, LogsIcon, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { Button } from "./ui/button"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Short title",
    url: "#",
  },
  {
    title: "User greeting",
    url: "#",
  },
  {
    title: "New Thread",
    url: "#",
  },
  {
    title: "Python code for hello world",
    url: "#",
  },
]

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://github.com/shadcn.png",
  },
}

export function AppSidebar() {
  return (
    <Sidebar className="select-none">
      <SidebarHeader className="pt-3">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-between items-center px-2">
            <Link href="/" className="text-xl font-medium">Convo</Link>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mx-2 sidebar">
        <SidebarGroup>
        <div className="flex justify-center items-center px-2 pb-4">
          <Button variant="default" className="w-full cursor-pointer">New Chat</Button>
        </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-3">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}