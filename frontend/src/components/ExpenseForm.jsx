import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseForm = ({
  onExpenseAdded,
  onEditSubmit,
  isEditing = false,
  expenseToEdit = null,
}) => {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Pre-fill when editing
  useEffect(() => {
    if (isEditing && expenseToEdit) {
      const formattedDate = expenseToEdit.date
        ? new Date(expenseToEdit.date).toISOString().split("T")[0]
        : "";
      setData({
        title: expenseToEdit.title || "",
        amount: expenseToEdit.amount || "",
        category: expenseToEdit.category || "",
        date: formattedDate,
      });
    } else {
      setData({ title: "", amount: "", category: "", date: "" });
    }
  }, [isEditing, expenseToEdit]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiBaseUrl =
        import.meta.env.MODE === "development"
          ? import.meta.env.VITE_API_BASE_URL_LOCAL
          : import.meta.env.VITE_API_BASE_URL;

      if (isEditing) {
        await axios.put(`${apiBaseUrl}/api/expenses/${expenseToEdit._id}`, data);
        onEditSubmit && onEditSubmit();
      } else {
        await axios.post(`${apiBaseUrl}/api/expenses`, data);
        setData({ title: "", amount: "", category: "", date: "" });
        onExpenseAdded && onExpenseAdded();
      }
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? "Edit Expense" : "Add Expense"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleInput}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={data.amount}
            onChange={handleInput}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            onChange={handleInput}
            required
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={data.date}
            onChange={handleInput}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          {isEditing ? "Update Expense" : "Add Expense"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => window.history.back()}
            className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default ExpenseForm;
