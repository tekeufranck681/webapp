import { useEffect} from "react";
import { useAuthStore } from "../store/authStore";
import { useExpenseStore } from "../store/expenseStore";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import FloatRight from "../components/FloatRight";


const ExpensesPage = () => {
  const { user } = useAuthStore();
  const { expenses, fetchExpenses, deleteExpense } = useExpenseStore();
  const navigate = useNavigate();
 

  useEffect(() => {
    if (user) fetchExpenses();
  }, [user, fetchExpenses]);

  // Group expenses by category
  const groupedExpenses: Record<string, typeof expenses> = expenses.reduce(
    (acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = [];
      }
      acc[expense.category].push(expense);
      return acc;
    },
    {} as Record<string, typeof expenses>
  );

  // Expense statistics for Pie Chart
  const expenseData = Object.keys(groupedExpenses).map((category) => ({
    name: category,
    value: groupedExpenses[category].reduce((sum, exp) => sum + exp.amount, 0),
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="w-screen h-screen flex bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      {/* Fixed Positioning for IconHome and Theme Toggle */}
      <FloatRight />
      {!user ? (
        <div className="w-full flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
              To view expenses, please log in!
            </h2>
            <p className="mt-2">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 dark:text-blue-400">
                Register here
              </a>
            </p>
            <p className="mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 dark:text-blue-400">
                Login here
              </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex w-full h-full">
          {/* Left Section: Statistics & Add Expense */}
          <div className="w-1/3 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">
              Expense Overview
            </h2>
            <PieChart width={400} height={300}>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {expenseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <p className="text-center mt-4 font-semibold">
              Total Expenses: {expenses.length}
            </p>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate("/expenses/add-expense")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
              >
                + Add New Expense
              </button>
            </div>
          </div>

          {/* Right Section: Scrollable Expense List */}
          <div className="w-2/3 p-6 overflow-y-auto h-full">
            {Object.keys(groupedExpenses).length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300 text-center">
                No expenses added yet.
              </p>
            ) : (
              Object.keys(groupedExpenses).map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">{category}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {groupedExpenses[category].map((expense) => (
                      <div
                        key={expense._id}
                        className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg hover:scale-105 transition-transform flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-bold">{expense.name}</h4>
                          <p>${expense.amount}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</p>
                        </div>
                        <div className="flex gap-3">
                        <button
                            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                            onClick={() => navigate(`/expenses/edit-expense`)}
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            onClick={() => deleteExpense(expense._id)}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
