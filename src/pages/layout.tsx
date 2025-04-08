import { useState } from "react";
import {  Outlet } from "react-router-dom";
import Navbar from "./navbar";
import { Menu, X } from "lucide-react";
import SideNav from "./sideNav";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />

      <div className="flex flex-1">
        <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 p-6 bg-gray-50 ${
            isSidebarOpen
              ? "opacity-50 pointer-events-none md:opacity-100 md:pointer-events-auto"
              : ""
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-[74px] left-1 z-30 text-gray-600 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
