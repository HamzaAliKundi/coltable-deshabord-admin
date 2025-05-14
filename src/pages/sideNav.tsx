import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { name: "Manage Performers", path: "/performers" },
  { name: "Manage Events", path: "/events" },
  { name: "Manage Venues", path: "/venues" },
  // { name: "Pending Activities", path: "/activities" },
  { name: "Media", path: "/media" },
  { name: "Reviews", path: "/reviews" },
  { name: "Banner / Advertisements", path: "/banner" },
  { name: "Settings", path: "/settings" },
];

interface SideNavProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideNav = ({ isSidebarOpen, toggleSidebar }: SideNavProps) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      navigate("/");
    }, 2000);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-[300px] bg-black shadow-md transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:relative`}
    >
      <nav className="ml-4 md:ml-12 sticky -top-16 lg:ml-24 pt-28 md:pt-12 lg:pt-20">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={toggleSidebar}
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
          {isSidebarOpen && (
            <li className="mt-8">
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle text-[#888888] flex items-center gap-2"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging Out...
                  </>
                ) : (
                  <>
                    <img
                      src="/login.svg"
                      alt="Logout"
                      className="w-[19px] h-[20px]"
                    />
                    Logout
                  </>
                )}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideNav;
