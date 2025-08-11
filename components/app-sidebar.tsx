"use client"

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
  useSidebar,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { Button } from "./ui/button"
import Link from "next/link"
import { SidebarIcon } from "lucide-react"
import { useRouter } from "next/navigation"

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
  const { 
    open,    
    setOpen,
  } = useSidebar()
  const router = useRouter();
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
              {items.map((item, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span className="py-3">{item.title}</span>
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