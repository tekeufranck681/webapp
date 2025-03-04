import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IconHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate("/")} 
      className="fixed top-4 right-25 p-3 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition shadow-lg z-50"
    >
      <Home size={24} />
    </button>
  );
};

export default IconHome;
