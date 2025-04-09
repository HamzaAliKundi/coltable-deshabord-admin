import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { name: "Manage Users", path: "/users" },
  { name: "Manage Events", path: "/events" },
  { name: "Manage Venues", path: "/venues" },
  { name: "Pending Activities", path: "/activities" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" }
];

interface SideNavProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideNav = ({ isSidebarOpen, toggleSidebar }: SideNavProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-[300px] bg-black shadow-md transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:relative`}
    >
      <nav className="ml-4 md:ml-12 lg:ml-24 pt-28 md:pt-12 lg:pt-20">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle ${
                    isActive ? "text-[#FFFFFF]" : "text-[#888888]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;