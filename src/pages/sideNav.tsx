import { NavLink, useLocation } from "react-router-dom";
import {
  X,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ClipboardList
} from "lucide-react";
import { useState } from "react";

interface DropdownItem {
  name: string;
  path: string;
  icon: any;
}

interface NavSection {
  name: string;
  icon: any;
  items?: DropdownItem[];
  path?: string;
  matchPaths?: string[];
}

const navSections: NavSection[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { 
    name: "Tasks", 
    path: "/tasks", 
    icon: ClipboardList,
    matchPaths: ["/tasks", "/task/add", "/task/edit"] 
  },
];

interface SideNavProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideNav = ({ isSidebarOpen, toggleSidebar }: SideNavProps) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  const toggleDropdown = (sectionName: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleTopLevelClick = () => setOpenDropdowns({});

  const isPathActive = (section: NavSection) => {
    if (section.matchPaths) {
      return section.matchPaths.some(path => location.pathname.startsWith(path));
    }
    return location.pathname === section.path;
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-[300px] bg-white border-r border-gray-300 shadow-md transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:relative`}
    >
      <nav className="px-4 pt-9 md:pt-2 lg:pt-4">
        <ul className="space-y-2">
          {navSections.map((section) => (
            <li key={section.name}>
              {section.items ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(section.name)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded transition-all ${
                      openDropdowns[section.name]
                        ? "!bg-gray-100 !border-l-4 !border-blue-300 !shadow-sm !text-blue-500 !font-semibold"
                        : "!text-gray-700 hover:!bg-gray-100 hover:!border-l-4 hover:!border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <section.icon className={`mr-3 h-5 w-5 ${
                        openDropdowns[section.name] ? "!text-blue-500" : "!text-gray-500"
                      }`} />
                      <span>{section.name}</span>
                    </div>
                    {openDropdowns[section.name] ? (
                      <ChevronDown className={`h-4 w-4 ${
                        openDropdowns[section.name] ? "!text-blue-500" : "!text-gray-500"
                      }`} />
                    ) : (
                      <ChevronRight className="h-4 w-4 !text-gray-500" />
                    )}
                  </button>
                  {openDropdowns[section.name] && (
                    <ul className="ml-6 mt-2 space-y-2">
                      {section.items.map((item) => (
                        <li key={item.path}>
                          <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                              `flex items-center px-4 py-2 rounded transition-all ${
                                isActive
                                  ? "!bg-gray-100 !border-l-4 !border-blue-300 !shadow-sm !text-blue-500 !font-semibold !no-underline"
                                  : "!text-gray-700 hover:!bg-gray-100 hover:!border-l-4 hover:!border-gray-300 !no-underline"
                              }`
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <item.icon className={`!mr-3 !h-4 !w-4 ${
                                  isActive ? "!text-blue-500" : "!text-gray-500"
                                }`} />
                                {item.name}
                              </>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={section.path!}
                  onClick={handleTopLevelClick}
                  className={
                    `flex items-center px-4 py-2 rounded transition-all ${
                      isPathActive(section)
                        ? "!bg-gray-100 !border-l-4 !border-blue-300 !shadow-lg !text-blue-500 !font-semibold !no-underline"
                        : "!text-gray-700 hover:!bg-gray-100 hover:!border-l-4 hover:!border-gray-300 !no-underline"
                    }`
                  }
                >
                  <section.icon className={`!mr-3 !h-5 !w-5 ${
                    isPathActive(section) ? "!text-blue-500" : "!text-gray-500"
                  }`} />
                  {section.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-gray-600 md:hidden"
      >
        <X className="h-5 w-5" />
      </button>
    </aside>
  );
};

export default SideNav;