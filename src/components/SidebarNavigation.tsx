import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Bell, Settings, SquareArrowUp } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Training Dashboard",
    url: "/train-dashboard",
    icon: SquareArrowUp,
  },
  {
    title: "Patients",
    url: "#",
    icon: Users,
  },
  {
    title: "Alerts",
    url: "#",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const SidebarNavigation = () => (
  <Sidebar>
    <SidebarContent className="pt-8">
      <SidebarGroup>
        <SidebarGroupLabel className="text-softblue-700 px-4 text-lg font-bold mb-2">Dr. James</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-softblue-200 transition-colors text-softblue-800">
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);

export default SidebarNavigation;
