import expenseModel from "../models/Expense.js";

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({});
    res.json({ success: true, data: expenses });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching expenses" });
  }
};

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Validate required fields
    if (!title || !amount || !category) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const expense = new expenseModel({
      title,
      amount,
      category,
      date: date || new Date(),
    });

    await expense.save();
    res.json({ success: true, message: "Expense added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding expense" });
  }
};

// Edit expense (bonus)
export const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const expense = await expenseModel.findById(id);
    if (!expense) {
      return res.json({ success: false, message: "Expense not found" });
    }

    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      { title, amount, category, date },
      { new: true }
    );

    res.json({ success: true, message: "Expense updated successfully", data: updatedExpense });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating expense" });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenseModel.findById(id);
    if (!expense) {
      return res.json({ success: false, message: "Expense not found" });
    }

    const deletedExpense = await expenseModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error deleting expense" });
  }
};
