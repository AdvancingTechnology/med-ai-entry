
import React from "react";
import { useLocation } from "react-router-dom";
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
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  SquareArrowUp 
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Patient Intake",
    url: "/intake-review",
    icon: Users,
  },
  {
    title: "Talk & Train",
    url: "/train-dashboard",
    icon: MessageSquare,
  },
  {
    title: "Follow-Up Scheduler",
    url: "/schedule-call",
    icon: Calendar,
  },
  {
    title: "AI Training Dashboard",
    url: "/train-dashboard",
    icon: SquareArrowUp,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const SidebarNavigation = () => {
  const location = useLocation();

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <Sidebar>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-softblue-700 px-4 text-lg font-bold mb-2">
            Dr. James
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url} 
                      className={`
                        flex items-center gap-3 px-2 py-3 rounded-lg transition-colors text-softblue-800 relative
                        ${isActive(item.url) 
                          ? 'bg-softblue-200 text-softblue-900 font-medium' 
                          : 'hover:bg-softblue-100'
                        }
                      `}
                    >
                      <item.icon 
                        className={`w-5 h-5 ${
                          isActive(item.url) ? 'text-softblue-600' : 'text-softblue-400'
                        }`} 
                      />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      {isActive(item.url) && (
                        <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-softblue-600 rounded-full" />
                      )}
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
};

export default SidebarNavigation;
