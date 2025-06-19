
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
import { FileText, MessageSquare, Calendar, Settings } from "lucide-react";

const items = [
  {
    title: "Patient Intake",
    url: "/intake-review",
    icon: FileText,
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
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const SidebarNavigation = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="text-softblue-700 px-4 text-lg font-bold mb-2">
            Dr. James
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a 
                        href={item.url} 
                        className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors relative ${
                          isActive 
                            ? 'bg-softblue-100 text-softblue-900 border-b-2 border-softblue-600' 
                            : 'text-softblue-800 hover:bg-softblue-200'
                        }`}
                      >
                        <item.icon 
                          className={`w-5 h-5 ${
                            isActive ? 'text-softblue-600' : 'text-softblue-700'
                          }`} 
                        />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-softblue-600 rounded-full" />
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNavigation;
