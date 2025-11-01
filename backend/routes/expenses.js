import express from "express";
import {
  getExpenses,
  addExpense,
  editExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.get("/", getExpenses);
expenseRouter.post("/", addExpense);
expenseRouter.put("/:id", editExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
