import mongoose from "mongoose";
import Expense from "../models/expense.model.js";
export const postExpense = async (req, res) => {
  const { name, amount, category, date } = req.body;
  const userId = req.userId;

  if (!name || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "Please Enter All fields" });
  }

  try {
    const isExpense = await Expense.findOne({ name: name, userId: userId });
    if (isExpense) {
      return res
        .status(409)
        .json({ success: false, message: `Expense: ${name} exists already` });
    }
    const newexpense = await Expense.create({
      name,
      amount,
      category,
      date,
      userId,
    });
    res
      .status(201)
      .json({ success: true, data: newexpense, message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.error("Error when adding an expense:", error.message);
  }
};

export const putExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  try {
    // Check if the expense exists for the user
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Trip ID" });
    }
    const existingExpense = await Expense.findOne({ _id: id, userId: userId });
    if (!existingExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    const { name, amount, category } = req.body;

    // If no changes are provided, return a response
    if (!name && !amount && !category) {
      return res
        .status(400)
        .json({ success: false, message: "No changes provided" });
    }

    // Check if another expense exists with the same name for the same user
    if (name) {
      const duplicateExpense = await Expense.findOne({
        name: name,
        userId: userId,
        _id: { $ne: id },
      });
      if (duplicateExpense) {
        return res.status(409).json({
          success: false,
          message: `There is already an expense with name ${name}`,
        });
      }
    }

    // Prepare update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (amount) updateData.amount = amount;
    if (category) updateData.category = category;

    // Update the expense
    await Expense.updateOne({ _id: id, userId: userId }, { $set: updateData });

    // Fetch the updated expense
    const updatedExpense = await Expense.findOne({ _id: id, userId: userId });

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error in updating expense:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.find({ userId });
    res.status(200).json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.error("Error in Getting All Expenses:", error.message);
  }
};

export const deleteExpense = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }

  try {
    const expense = await Expense.deleteOne({ _id: id, userId: userId });
    res
      .status(200)
      .json({ success: true, message: "Expense Deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
    console.error("Error in Expense Deletion", error.message);
  }
};
export const getExpense = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }
  try {
    const userId = req.userId;
    const existingExpense = await Expense.findOne({ _id: id, userId: userId });

    res.status(200).json({ success: true, data: existingExpense });
  } catch (error) {
    console.error("Error when fetching expense:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
