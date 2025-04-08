import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaHome, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaTh } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-black text-white h-[100px] w-full flex items-center z-30 px-8 md:px-20 justify-between relative">
      {/* Left Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src="/logo.svg" alt="DragSpace Logo" className="h-12" />
        </Link>
      </div>

      {/* Middle Navigation - Desktop */}
      <div className="hidden md:flex items-center w-[616px] h-[66px] p-2 rounded-full shadow-lg backdrop-blur-sm" 
     style={{
       background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(24, 24, 24, 0.9) 50%, rgba(255, 255, 255, 0.1) 100%)",
       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
     }}>
        <div className="flex items-center space-x-5 px-4 text-sm">
          <div className="flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2">
              <FaHome className="w-4 h-4" /> Home
            </Link>
            {location.pathname === "/" && (
              <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Link to="/performers" className="flex items-center gap-2">
              <FaUsers className="w-4 h-4" /> Performers
            </Link>
            {location.pathname === "/performers" && (
              <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Link to="/venues" className="flex items-center gap-2">
              <FaMapMarkerAlt className="w-4 h-4" /> Venues
            </Link>
            {location.pathname === "/venues" && (
              <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Link to="/events" className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4" /> Events
            </Link>
            {location.pathname === "/events" && (
              <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Link to="/more" className="flex items-center gap-2">
              <FaTh className="w-4 h-4" /> More
            </Link>
            {location.pathname === "/more" && (
              <div className="w-full h-[3px] bg-[#FF00A2] rounded-[5px] mt-2"></div>
            )}
          </div>
        </div>
        {/* Search Icon */}
        <div className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4 cursor-pointer">
          <FiSearch className="text-white w-6 h-6" />
        </div>
      </div>

      {/* Right Links */}
      {/* Right Links */}
      <div className="hidden md:flex space-x-6">
        <Link to="#" className="text-sm mt-1">
          Registration
        </Link>
        <Link to="#" className="text-sm flex items-center gap-2">
          <img
            src="/login.svg"
            alt="Login"
            className="w-[19px] h-[20px] mb-1"
          />
          <span>Login</span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <FiX className="w-8 h-8" /> : <FiMenu className="w-8 h-8" />}
      </button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[100px] left-0 w-full bg-gray-900 text-white flex flex-col space-y-4 p-5 md:hidden z-50 shadow-lg"
          >
            <Link
              to="/"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaHome /> Home
            </Link>
            <Link
              to="/performers"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaUsers /> Performers
            </Link>
            <Link
              to="/venues"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaMapMarkerAlt /> Venues
            </Link>
            <Link
              to="/events"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaCalendarAlt /> Events
            </Link>
            <Link
              to="/more"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <FaTh /> More
            </Link>
            <Link to="/registration" className="py-2" onClick={handleLinkClick}>
              Registration
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 py-2"
              onClick={handleLinkClick}
            >
              <img
                src="/login.svg"
                alt="Login"
                className="w-4 h-4"
              />
              <span>Login</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}