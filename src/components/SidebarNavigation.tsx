
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
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  SquareArrowUp,
  UserCheck,
  ClipboardCheck,
  Bell,
  Settings,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Simulation Setup",
    url: "/scenario-setup",
    icon: SquareArrowUp,
  },
  {
    title: "Interactive Session",
    url: "/simulation-session",
    icon: UserCheck,
  },
  {
    title: "Review & Feedback",
    url: "/simulation-review",
    icon: ClipboardCheck,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
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
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-2 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-softblue-100 text-softblue-900 shadow font-semibold"
                            : "hover:bg-softblue-50 text-softblue-800"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            isActive
                              ? "text-softblue-700"
                              : "text-softblue-400"
                          }`}
                        />
                        <span>{item.title}</span>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 bg-softblue-500 rounded-r-md" />
                        )}
                      </Link>
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

