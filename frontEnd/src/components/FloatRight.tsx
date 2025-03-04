import { Theme } from "../components/ThemeContext";
import { Sun, Moon } from "lucide-react";
import IconHome from "./IconHome";

const FloatRight = () => {
    const { theme, toggleTheme } = Theme();
  return (
    <div className="fixed top-4 right-10 flex gap-3 z-50">
    <IconHome />
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition shadow-lg"
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  </div>
  )
}

export default FloatRight
