import { create } from "zustand";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:4500/api/expenses";

interface Expense {
  _id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  userId: string;
}

interface ExpenseState {
  expenses: Expense[];
  error: string | null;
  selectedExpense: Expense | null;
  fetchExpenses: () => Promise<void>;
  createExpense: (name: string, amount: number, category: string, date: string, userId: string) => Promise<void>;
  updateExpense: (id: string, name: string, amount: number, category: string, date: string) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  setSelectedExpense: (expense: Expense | null) => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  expenses: [],
  error: null,
  selectedExpense: null,

  fetchExpenses: async () => {
    try {
      const response = await axios.get<{ data: Expense[] }>(`${API_URL}/`);
      set({ expenses: response.data.data });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  },

  createExpense: async (name, amount, category, date, userId) => {
    try {
      const response = await axios.post<{ data: Expense }>(`${API_URL}/`, { name, amount, category, date, userId });
      set((state) => ({ expenses: [...state.expenses, response.data.data] }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      set({ error: axiosError.response?.data?.message || "Error creating expense" });
    }
  },

  updateExpense: async (id, name, amount, category, date) => {
    try {
      const response = await axios.put<{ data: Expense }>(`${API_URL}/${id}`, { name, amount, category, date });
      set((state) => ({
        expenses: state.expenses.map((expense) => (expense._id === id ? response.data.data : expense)),
        selectedExpense: null,
      }));
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  },

  deleteExpense: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  },

  setSelectedExpense: (expense) => set({ selectedExpense: expense }),
}));

