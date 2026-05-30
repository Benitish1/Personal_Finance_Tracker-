/**
 * Expense context:
 * - Task 2: create via POST /expenses
 * - Task 4: list via GET /expenses
 * - Task 5: delete via DELETE /expenses/{id}
 * Task 3 (single detail) is fetched in detail screen via GET /expenses/{id}.
 */
import React, { createContext, useContext, useMemo, useState } from "react";
import { createExpenseApi, deleteExpenseApi, getAllExpenses } from "../services/expenseService";

const ExpenseContext = createContext(null);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(false);

  const fetchExpenses = async () => {
    setLoadingExpenses(true);
    try {
      const data = await getAllExpenses();
      setExpenses(Array.isArray(data) ? data : []);
      return data;
    } finally {
      setLoadingExpenses(false);
    }
  };

  const createExpense = async (payload) => {
    const created = await createExpenseApi(payload);
    setExpenses((prev) => [created, ...prev]);
    return created;
  };

  const deleteExpense = async (id) => {
    await deleteExpenseApi(id);
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const value = useMemo(
    () => ({
      expenses,
      loadingExpenses,
      fetchExpenses,
      createExpense,
      deleteExpense,
    }),
    [expenses, loadingExpenses]
  );

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) {
    throw new Error("useExpenses must be used inside ExpenseProvider");
  }
  return ctx;
};
