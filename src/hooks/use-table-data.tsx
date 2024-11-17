"use client";

import FixedExpenseRequests from "@/requests/fixed-expenses.requests";
import ReceiptRequests from "@/requests/receipts.requests";
import VariableExpensesRequests from "@/requests/variable-expenses.requests";
import { useMutation, useQueries } from "@tanstack/react-query";

type UseTableDataProps = {
  planningId: number;
};

export type UseTableDataDeleteMutationParams = {
  id: number;
};

export type UseTableDataCreateMutationParams = {
  planning_id: number;
};
export default function useTableData({ planningId }: UseTableDataProps) {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["planning", planningId, "fixed_expenses"],
        queryFn: async () =>
          await FixedExpenseRequests.listByPlanningId(planningId),
        enabled: false,
      },
      {
        queryKey: ["planning", planningId, "variable_expenses"],
        queryFn: async () =>
          await VariableExpensesRequests.listByPlanningId(planningId),
        enabled: false,
      },
      {
        queryKey: ["planning", planningId, "receipts"],
        queryFn: async () => await ReceiptRequests.listByPlanningId(planningId),
        enabled: false,
      },
    ],
  });

  const [fixedExpensesQuery, variableExpensesQuery, receiptsQuery] = queries;

  const createVariableExpenseMutation = useMutation({
    mutationKey: ["create", "variable_expense"],
    mutationFn: async ({ planning_id }: UseTableDataCreateMutationParams) => {
      return await VariableExpensesRequests.create(planning_id);
    },
    onSuccess: async () => {
      await variableExpensesQuery.refetch();
    },
  });

  const createFixedExpenseMutation = useMutation({
    mutationKey: ["create", "fixed_expense"],
    mutationFn: async ({ planning_id }: UseTableDataCreateMutationParams) => {
      return await FixedExpenseRequests.create(planning_id);
    },
    onSuccess: async () => {
      await fixedExpensesQuery.refetch();
    },
  });
  const createReceiptMutation = useMutation({
    mutationKey: ["create", "receipt"],
    mutationFn: async ({ planning_id }: UseTableDataCreateMutationParams) => {
      return await ReceiptRequests.create(planning_id);
    },
    onSuccess: async () => {
      await fixedExpensesQuery.refetch();
    },
  });

  const deleteFixedExpenseMutation = useMutation({
    mutationKey: ["delete", "fixed_expense"],
    mutationFn: async ({ id }: UseTableDataDeleteMutationParams) => {
      await FixedExpenseRequests.delete(id);
    },
    onSuccess: async () => {
      await fixedExpensesQuery.refetch();
    },
  });

  const deleteVariableExpenseMutation = useMutation({
    mutationKey: ["delete", "variable_expense"],
    mutationFn: async ({ id }: UseTableDataDeleteMutationParams) => {
      await VariableExpensesRequests.delete(id);
    },
    onSuccess: async () => {
      await variableExpensesQuery.refetch();
    },
  });

  const deleteReceiptMutation = useMutation({
    mutationKey: ["delete", "variable_expense"],
    mutationFn: async ({ id }: UseTableDataDeleteMutationParams) => {
      await ReceiptRequests.delete(id);
    },
    onSuccess: async () => {
      await receiptsQuery.refetch();
    },
  });

  return {
    queries: {
      fixedExpensesQuery,
      variableExpensesQuery,
      receiptsQuery,
    },
    mutations: {
      createVariableExpenseMutation,
      createFixedExpenseMutation,
      createReceiptMutation,
      deleteFixedExpenseMutation,
      deleteVariableExpenseMutation,
      deleteReceiptMutation,
    },
  };
}
