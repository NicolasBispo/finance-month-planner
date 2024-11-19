"use client";

import {
  calculatePercentage,
  sumEntitiesValues,
} from "@/helpers/finance-helper";
import FixedExpense from "@/types/entities/fixed_expense.entity";
import Receipt from "@/types/entities/receipt.entity";
import VariableExpense from "@/types/entities/variable_expense.entity";

import { isAfter } from "date-fns";

type UseFinanceCalcProps = {
  fixed_expenses: FixedExpense[];
  receipts: Receipt[];
  variable_expenses: VariableExpense[];
};
export default function useFinanceCalc({
  fixed_expenses,
  receipts,
  variable_expenses,
}: UseFinanceCalcProps) {
  const getTotalValuesChartData = () => {
    const totalDebts = calculateDebts();
    const fixedExpensesValues = sumEntitiesValues(fixed_expenses);
    const variableExpensesValues = sumEntitiesValues(variable_expenses);
    const receiptsValues = sumEntitiesValues(receipts);

    return [
      calculatePercentage(variableExpensesValues, totalDebts),
      calculatePercentage(fixedExpensesValues, totalDebts),
      calculatePercentage(receiptsValues, totalDebts),
    ];
  };

  const calculateDebts = () => {
    const fixedExpensesValues = sumEntitiesValues(fixed_expenses);
    const variableExpensesValues = sumEntitiesValues(variable_expenses);
    const receiptsValues = sumEntitiesValues(receipts);

    return receiptsValues - (fixedExpensesValues + variableExpensesValues);
  };

  const getFutureFixedExpenses = () => {
    const futureItems = fixed_expenses.filter(
      (fixed_expense) =>
        isAfter(fixed_expense.due_date, new Date()) && !fixed_expense.is_paid
    );

    console.log("future items", futureItems);
    return futureItems;
  };

  const getRemainingReceipts = () => {
    const paidFixedExpensesEntities = fixed_expenses.filter(
      (fixed_expense) => fixed_expense.is_paid
    );

    const paidFixedExpenses = sumEntitiesValues(paidFixedExpensesEntities);

    const receiptsTotalValues = sumEntitiesValues(receipts);

    const remainingReceipt = receiptsTotalValues - paidFixedExpenses;
    if (remainingReceipt < 0) {
      return 0;
    }
    return remainingReceipt;
  };

  const getFutureDebtsChartData = () => {
    return [
      sumEntitiesValues(getFutureFixedExpenses()),
      getRemainingReceipts(),
    ];
  };
  return {
    calculateDebts,
    getTotalValuesChartData,
    getFutureFixedExpenses,
    getRemainingReceipts,
    getFutureDebtsChartData,
  };
}
