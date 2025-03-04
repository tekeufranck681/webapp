import NavBar from "../components/NavBar.tsx";
import { motion } from "framer-motion";
import Footer from "../components/Footer.tsx";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore.ts";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const features: Array<{ title: string; desc: string; icon: string }> = isAuthenticated
    ? [
        { title: "Sync Your Expenses", desc: "Access your expenses on any device.", icon: "🔄" },
        { title: "Custom Budget Alerts", desc: "Get notified when exceeding budgets.", icon: "🔔" },
        { title: "Shareable Plans", desc: "Easily share your travel plans with friends.", icon: "📤" },
        { title: "Advanced Analytics", desc: "Gain insights into your spending.", icon: "📈" },
        { title: "Expense Export", desc: "Download your reports in CSV & PDF.", icon: "📤" },
      ]
    : [
        { title: "Track Your Expenses", desc: "Monitor your travel expenses effortlessly.", icon: "💰" },
        { title: "Currency Converter", desc: "Get real-time currency exchange rates.", icon: "💱" },
        { title: "Plan Your Trip", desc: "Create and manage your travel budget efficiently.", icon: "🛫" },
        { title: "Smart Budgeting", desc: "AI-powered budgeting tailored to your trip.", icon: "🧠" },
        { title: "Expense Categorization", desc: "Sort expenses into categories.", icon: "📊" },
      ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 dark:bg-gray-900">
      <NavBar />

      {/* Hero Section */}
      <div
        className="relative flex-1 flex flex-col justify-center items-center text-center pt-[200px] px-4 sm:px-6 lg:px-8 w-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/station.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <section className="relative z-10 flex flex-col justify-center items-center w-full py-20 max-w-[90%] lg:max-w-5xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Plan & Track Your Travel Budget
          </motion.h1>
          <motion.p 
            className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Manage expenses, convert currencies, and plan your trips efficiently.
          </motion.p>
          {!isAuthenticated && (
            <motion.div
              className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button
                className="px-6 py-3 bg-green-500 text-white dark:bg-green-700 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-green-600"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              <button
                className="px-6 py-3 bg-black text-white dark:bg-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gray-900"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </motion.div>
          )}
        </section>
      </div>

      {/* Features Section */}
      <section className="mt-20 w-full bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-12">
          Features
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90%] lg:max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Call-to-Action for Non-Authenticated Users */}
      {!isAuthenticated && (
        <motion.section
          className="my-20 py-16 w-full max-w-[90%] lg:max-w-4xl mx-auto bg-gradient-to-r from-green-500 to-green-700 text-white text-center rounded-lg shadow-lg px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold">Start Planning Your Trips Today!</h2>
          <p className="mt-2">Manage your travel expenses and create seamless budgets effortlessly.</p>
          <button
            className="mt-6 px-6 py-3 bg-black text-white dark:bg-gray-800 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gray-900"
            onClick={() => navigate("/signup")}
          >
            Start Planning Now
          </button>
        </motion.section>
      )}
     {isAuthenticated && ( 
  <div className="flex flex-col items-center justify-center text-center mt-[90px] bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-md w-full max-w-lg mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      Manage Your Travel Budget
    </h2>
    <p className="text-gray-700 dark:text-gray-300 mb-6">
      Easily add expenses and plan trips with just one click.
    </p>

    <div className="flex flex-col md:flex-row items-center pl-9 gap-4 w-full">
      <motion.button
        className="w-full md:w-auto px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md"
        onClick={() => navigate("/add-expense")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        + Add New Expense
      </motion.button>

      <motion.button
        className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
        onClick={() => navigate("/plan-trip")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ✈ Plan a New Trip
      </motion.button>
    </div>
  </div>
)}



      <Footer />
    </div>
  );
};

export default HomePage;
