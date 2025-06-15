
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, SquareArrowUp, UserCheck, ClipboardCheck, Bell, Settings } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
    name: "Simulation Setup",
    label: "Simulation Setup",
    icon: SquareArrowUp,
    to: "/scenario-setup",
  },
  {
    name: "Interactive Session",
    label: "Interactive Session",
    icon: UserCheck,
    to: "/simulation-session",
  },
  {
    name: "Review & Feedback",
    label: "Review & Feedback",
    icon: ClipboardCheck,
    to: "/simulation-review",
  },
  {
    name: "Notifications",
    label: "Notifications",
    icon: Bell,
    to: "/notifications",
  },
  {
    name: "Settings",
    label: "Settings",
    icon: Settings,
    to: "/settings",
  },
];

const MainMenuBar: React.FC = () => {
  const location = useLocation();
  return (
    <nav className="w-full bg-white border-b border-softblue-100 flex items-center justify-center py-1 px-2 shadow-sm z-40">
      <ul className="flex gap-2 md:gap-6 w-full max-w-5xl mx-auto items-center">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.name}>
              <Link
                to={item.to}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all
                  ${isActive ? "text-softblue-700 bg-softblue-100 shadow" : "text-softblue-500 hover:text-softblue-700 hover:bg-softblue-50"}
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon size={18} className={`${isActive ? "text-softblue-700" : "text-softblue-400"}`} />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
              {isActive && (
                <div className="h-1 rounded bg-softblue-600 mt-1" />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainMenuBar;
