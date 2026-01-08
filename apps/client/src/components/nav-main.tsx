import { Link, useLocation } from "react-router-dom"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
}) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            // kalau ingin active saat prefix cocok:
            // const isActive = pathname.startsWith(item.url)

            return (
              <SidebarMenuItem key={item.title} className="flex items-center gap-2">
                <Link
                  to={item.url}
                  className={`min-w-8 w-full rounded-md duration-200 ease-linear ${
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/90"
                      : "hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
