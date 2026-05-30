import { mockExpenses } from "./mockData";

let expenses = [...mockExpenses];

export const getAllExpenses = async () => {
  return [...expenses];
};

export const createExpenseApi = async (payload) => {
  const created = {
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };
  expenses = [created, ...expenses];
  return created;
};

export const getExpenseById = async (id) => {
  const expense = expenses.find((item) => item.id === id);
  if (!expense) {
    throw new Error("Expense not found.");
  }
  return expense;
};

export const deleteExpenseApi = async (id) => {
  const deleted = expenses.find((item) => item.id === id);
  expenses = expenses.filter((item) => item.id !== id);
  return deleted;
};
