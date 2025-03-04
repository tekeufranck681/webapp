import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useExpenseStore } from "../store/expenseStore";
import { useNavigate, useParams } from "react-router-dom";
import FloatRight from "@/components/FloatRight";
import { Theme } from "../components/ThemeContext";
import { motion } from "framer-motion";

const ExpenseFormPage = () => {
  const { user } = useAuthStore();
  const { createExpense, updateExpense, expenses } = useExpenseStore();
  const navigate = useNavigate();
  const { theme } = Theme();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (id && expenses.length > 0) {
      console.log("Expense ID:", id);
      const existingExpense = expenses.find((expense) => expense._id === id);
      if (existingExpense) {
        setFormData({
          name: existingExpense.name,
          amount: existingExpense.amount.toString(),
          category: existingExpense.category,
          date: existingExpense.date,
        });
      }
    }
  }, [id, expenses]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    if (!user) return;
  
    if (id) {
      updateExpense(id, formData.name, Number(formData.amount), formData.category, formData.date);
    } else {
      createExpense(formData.name, Number(formData.amount), formData.category, formData.date, user.id);
    }
  
    navigate("/expenses");
  };
  

  return (
    <div className="w-screen h-screen flex bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <FloatRight />
      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit} 
        className={`p-6 rounded-lg shadow-lg w-96 transition-all duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
        <h2 className="text-xl font-bold mb-4 text-center">{id ? "Update Expense" : "Add New Expense"}</h2>

        <input type="text" name="name" placeholder="Expense Name" value={formData.name} onChange={handleChange}
          className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500 transition-all duration-300" required />

        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange}
          className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500 transition-all duration-300" required />

        <select name="category" value={formData.category} onChange={handleChange}
          className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500 transition-all duration-300" required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Accommodation">Accommodation</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <input type="date" name="date" value={formData.date} onChange={handleChange}
          className="w-full border p-2 rounded mb-2 focus:ring-2 focus:ring-blue-500 transition-all duration-300" required />

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-all duration-300">
          {id ? "Update Expense" : "Submit Expense"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ExpenseFormPage;



