"use client";

import React, { ReactNode, useState, useEffect } from "react";
import {
  FaPlusCircle,
  FaCog,
  FaUserPlus,
  FaUserCircle,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const storedUser = localStorage.getItem("User");
    const User = storedUser ? JSON.parse(storedUser) : null;
    setIsLoggedIn(!!User);
  }, [pathname]);

  if (!hasMounted) return null;

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", href: "/dashboard" },
    { icon: <FaPlusCircle />, label: "Add Expenses", href: "/addexpenses" },
    { icon: <FaCog />, label: "Settings", href: "/settings" },
    { icon: <FaUserPlus />, label: "Households", href: "/" },
    {
      icon: <FaUserCircle />,
      label: isLoggedIn ? "Profile" : "Login",  // 👈 dynamic label
      href: isLoggedIn ? "/profile" : "/login", // 👈 dynamic route
    },
  ];

  return (
    <aside
      className={`mt-[68px] h-screen bg-white shadow-md fixed top-0 left-0 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-60" : "w-16"
        }`}
    >
      <div
        className={`${isExpanded ? "px-5 justify-start" : "flex justify-center"
          } py-3`}
      >
        <button
          className="text-gray-600 hover:text-gray-800 cursor-pointer text-lg"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-3 overflow-hidden">
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            expanded={isExpanded}
            active={pathname === item.href}
            onClick={() => router.push(item.href)}
          />
        ))}
      </nav>
    </aside>
  );
};

const MenuItem = ({
  icon,
  label,
  expanded,
  active = false,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  expanded: boolean;
  active?: boolean;
  onClick: () => void;
}) => (
  <div
    className={`flex items-center text-gray-700 px-3 ${expanded ? "" : "justify-center"
      } py-2 rounded cursor-pointer transition space-x-3 overflow-hidden 
      ${active ? "bg-gray-200 font-medium text-black" : "hover:bg-gray-100"}`}
    onClick={onClick}
  >
    <span className="text-lg">{icon}</span>
    {expanded && <span className="text-md truncate">{label}</span>}
  </div>
);

export default Sidebar;
