import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import EditExpensePage from "./components/EditExpensePage.jsx";

function App() {
  // Used to re-render of the ExpenseList whenever data changes
  const [reload, setReload] = useState(0);
  const navigate = useNavigate();

  // Called after adding or editing an expense
  const refreshExpenses = () => {
    setReload((prev) => prev + 1);
  };

  // Navigate to the edit page with selected expense details
  const openEditPage = (expense) => {
    navigate(`/edit/${expense._id}`, { state: { expense } });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* App Title */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-gray-800">
            Expense Tracker
          </h1>
        </header>

        {/* app routes */}
        <Routes>
          {/* Home - Add and List Expenses */}
          <Route
            path="/"
            element={
              <>
                <ExpenseForm onExpenseAdded={refreshExpenses} />
                <ExpenseList key={reload} onEdit={openEditPage} />
              </>
            }
          />

          {/* Edit Expense Page */}
          <Route
            path="/edit/:id"
            element={<EditExpensePage onExpenseUpdated={refreshExpenses} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
