import express from "express";
import { getExpenses, addExpense, editExpense, deleteExpense } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

// Get all expenses
expenseRouter.get("/", getExpenses);

// Add new expense
expenseRouter.post("/", addExpense);

// Edit expense 
expenseRouter.put("/:id", editExpense);

// Delete expense
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
