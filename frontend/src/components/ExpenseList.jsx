import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseList = ({ onEdit, refreshKey = 0 }) => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryStatus, setCategoryStatus] = useState({});

  //  loading all expenses
  const allExpenses = async () => {
    try {
     const apiBaseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL_LOCAL
    : import.meta.env.VITE_API_BASE_URL;

      const res = await axios.get(`${apiBaseUrl}/api/expenses`);
      if (res.data?.success) {
        const data = res.data.data || [];
        setExpenses(data);
        totalExpenses(data);
      } else {
        console.log("Could not fetch expenses:", res.data?.message);
        setExpenses([]);
        setTotalAmount(0);
        setCategoryStatus({});
      }
    } catch (err) {
      console.error("Error loading expenses:", err);
    }
  };

  // total and per category sum
  const totalExpenses = (list) => {
    let total = 0;
    const byCategory = {};

    list.forEach((exp) => {
      const amount = Number(exp.amount || 0);
      const cat = exp.category || "Other";
      total += amount;
      byCategory[cat] = (byCategory[cat] || 0) + amount;
    });

    setTotalAmount(total);
    setCategoryStatus(byCategory);
  };

  // delete an expense
  const deleteExpense = async (id) => {
    try {
      const apiBaseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_BASE_URL_LOCAL
    : import.meta.env.VITE_API_BASE_URL;

      await axios.delete(`${apiBaseUrl}/api/expenses/${id}`);
      allExpenses();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  // fetch data when refreshed
  useEffect(() => {
    allExpenses();
  }, [refreshKey]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Your Expenses</h2>

      {/* Total + Category Summary */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-1">
          Total Spent: ${totalAmount.toFixed(2)}
        </h3>
        <p className="font-medium mb-2">By Category:</p>
        {Object.keys(categoryStatus).length === 0 ? (
          <p className="text-gray-500 text-sm">No data yet</p>
        ) : (
          <ul className="list-disc list-inside text-gray-700">
            {Object.entries(categoryStatus).map(([cat, amt]) => (
              <li key={cat}>
                {cat}: ${amt.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Expense Cards */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          expenses.map((exp) => (
            <div
              key={exp._id}
              className="border border-gray-200 rounded-md p-4 flex justify-between items-center hover:shadow-sm transition"
            >
              <div>
                <h3 className="text-lg font-medium">{exp.title}</h3>
                <p className="text-sm text-gray-600">
                  {exp.category}-{" "}
                  {exp.date
                    ? new Date(exp.date).toLocaleDateString()
                    : "No date"}
                </p>
                <p className="text-xl font-semibold text-green-600 mt-1">
                  ${Number(exp.amount).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(exp)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExpense(exp._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
