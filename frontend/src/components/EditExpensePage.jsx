import { useNavigate, useLocation } from "react-router-dom";
import ExpenseForm from "./ExpenseForm.jsx";

const EditExpensePage = ({ refreshExpenses  }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const expense = state?.expense;

  const handleUpdate  = () => {
    refreshExpenses ();
    navigate("/");
  };

  if (!expense) {
     return <p className="text-center mt-6">No expense found to edit.</p>;
  }

  return (
      <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Expense</h2>
      <ExpenseForm
        isEditing
        expenseToEdit={expense}
        onEditSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditExpensePage;
