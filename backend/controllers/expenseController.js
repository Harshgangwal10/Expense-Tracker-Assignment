import expenseModel from "../models/Expense.js";

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({}).sort({ date: -1 });
    res.json({
      success: true,
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error.message);
    res.json({ success: false, message: "Error fetching expenses" });
  }
};

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // Validation
    if (!title || !amount || !category) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.json({
        success: false,
        message: "Amount must be a valid positive number",
      });
    }

    let parsedDate = new Date();
    if (date && date.trim() !== "") {
      const tempDate = new Date(date);
      if (!isNaN(tempDate.getTime())) parsedDate = tempDate;
    }

    const newExpense = new expenseModel({
      title,
      amount: numAmount,
      category,
      date: parsedDate,
    });

    const savedExpense = await newExpense.save();
    res.json({
      success: true,
      message: "Expense added successfully",
      data: savedExpense,
    });
 } catch (error) {
  console.error(" Error adding expense:", error); 
  res.status(500).json({ success: false, message: error.message });
}

};

// Edit expense
export const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const existing = await expenseModel.findById(id);
    if (!existing) {
      return res.json({ success: false, message: "Expense not found" });
    }

    const updatedExpense = await expenseModel.findByIdAndUpdate(
      id,
      { title, amount, category, date },
      { new: true }
    );

    res.json({
      success: true,
      message: "Expense updated successfully",
      data: updatedExpense,
    });
  } catch (error) {
    console.error("updating expense:", error.message);
    res.json({ success: false, message: "Error updating expense" });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await expenseModel.findById(id);
    if (!existing) {
      return res.json({ success: false, message: "Expense not found" });
    }

    await expenseModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error.message);
    res.json({ success: false, message: "Error deleting expense" });
  }
};
