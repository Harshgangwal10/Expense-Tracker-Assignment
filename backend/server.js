import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import expenseRouter from "./routes/expenses.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: [
    "https://expense-tracker-assignment-ar2a1qqs7-harshs-projects-87f7c4b0.vercel.app/",
    "http://localhost:5173",
  ],
  credentials: true
}));

// Database connection
connectDB();

// Routes
app.use("/api/expenses", expenseRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

export default app;
