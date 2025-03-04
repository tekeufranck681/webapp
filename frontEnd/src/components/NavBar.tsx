import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuthStore } from "../store/authStore.ts";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon, Settings } from "lucide-react";
import { Theme } from "./ThemeContext.tsx";

const getColorFromUsername = (username: string) => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5"];
  const index = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuthStore();
  const { theme, toggleTheme } = Theme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const location = useLocation(); // Get the current URL

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 left-0 w-full bg-gray-200 dark:bg-gray-900 shadow-md px-6 py-4 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }  flex items-center justify-between z-50`}>
      
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 cursor-pointer"> 
        <img src={logo} alt="logo" className="size-10" />
        <p className="text-5xl font-bold text-gray-900 dark:text-gray-100">TravCalc</p>
      </Link>

      {/* Desktop Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300 font-semibold text-xl">
        {["Home", "Expenses", "PlanTrip", "Converter", "About"].map((item, index) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;

          return (
            <li key={index} className="relative group cursor-pointer">
              <Link
                to={path}
                className={`transition ${
                  isActive ? "text-green-600 border-b-2 border-green-600" : "hover:text-green-600"
                }`}
              >
                {item}
              </Link>
              <span
                className={`absolute left-0 bottom-[-3px] h-[2px] bg-green-600 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </li>
          );
        })}
      </ul>

      {/* Auth and Theme Section */}
      <div className="hidden md:flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
              style={{ backgroundColor: user?.name ? getColorFromUsername(user.name) : "#ccc" }}
              whileHover={{ scale: 1.1 }}
            >
              {user?.name ? user.name[0].toUpperCase() : "?"}
            </motion.div>
            <Link to="/settings" className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
              <Settings size={20} />
            </Link>
            <motion.button
              className="px-4 py-2 rounded-lg shadow-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 dark:bg-gray-900 flex flex-col items-center py-4 space-y-4 md:hidden">
          {["Home", "Expenses", "PlanTrip", "Converter", "About"].map((item, index) => {
            const path = `/${item.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={index}
                to={path}
                className={`text-gray-700 dark:text-gray-300 font-medium transition cursor-pointer ${
                  isActive ? "text-green-600 font-bold" : "hover:text-green-600"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            );
          })}
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated ? (
            <motion.button className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition" onClick={handleLogout}>
              Logout
            </motion.button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">Login</Link>
              <Link to="/signup" className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
