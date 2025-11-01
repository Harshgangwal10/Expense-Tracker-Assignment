import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import expenseRouter from "./routes/expenses.js";

dotenv.config();
const app = express();

// CORS setup for both local and deployed frontend
app.use(
  cors({
    origin: [
      "https://expense-tracker-assignment-navy.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/expenses", expenseRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running!");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);

export default app;
