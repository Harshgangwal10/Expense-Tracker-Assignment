import expenseModel from "../models/Expense.js";

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({});
    if (expenses.length === 0) {
      res.json({ success: true, message: "No expenses found", data: expenses });
    } else {
      res.json({ success: true, message: "Expenses fetched successfully", data: expenses });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching expenses" });
  }
};

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    console.log("Received data:", { title, amount, category, date });

    // Validate required fields
    if (!title || !amount || !category) {
      console.log("Validation failed: Missing required fields");
      return res.json({ success: false, message: "All fields are required" });
    }

    // Validate amount is a valid positive number
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      console.log("Validation failed: Invalid amount");
      return res.json({ success: false, message: "Amount must be a valid positive number" });
    }

    // Handle date if empty or invalid, use current date
    let parsedDate = new Date();
    if (date && date.trim() !== "") {
      const tempDate = new Date(date);
      if (!isNaN(tempDate.getTime())) {
        parsedDate = tempDate;
      } else {
        console.log("Invalid date provided, using current date");
      }
    }

    const expense = new expenseModel({
      title,
      amount: Number(amount), // amount is a number
      category,
      date: parsedDate,
    });

    console.log("Saving expense:", expense);
    const savedExpense = await expense.save();
    res.json({ success: true, message: "Expense added successfully", data: savedExpense });
  } catch (error) {
  console.error(" Error adding expense:", error.message);
  res.json({ success: false, message: error.message });
}
};

// Edit expense 
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
