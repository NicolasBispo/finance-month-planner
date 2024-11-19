/* eslint-disable react-hooks/rules-of-hooks */
import { TableDateCell } from "@/components/data-table-inputs/table-date-cell";
import TableDeleteCell from "@/components/data-table-inputs/table-delete-cell";
import TableFinanceCell from "@/components/data-table-inputs/table-finance-cell";
import { TableTextCell } from "@/components/data-table-inputs/table-text-cell";
import TableTextareaCell from "@/components/data-table-inputs/table-textarea-cell";
import useTableData from "@/hooks/use-table-data";
import VariableExpenseRequests from "@/requests/variable-expenses.requests";
import VariableExpense from "@/types/entities/variable_expense.entity";
import { ColumnDef } from "@tanstack/react-table";

const updateElementByIdRequest = async (
  recordId: number,
  updateKey: string,
  updateValue: unknown
) => {
  return await VariableExpenseRequests.update(recordId, {
    [updateKey as keyof VariableExpense]: updateValue,
  });
};

function refetchFunction(planningId: number) {
  const {
    queries: { variableExpensesQuery },
  } = useTableData({ planningId });
  return variableExpensesQuery.refetch;
}
export const variableExpenseColumns: ColumnDef<VariableExpense>[] = [
  {
    id: "action_cell",
    header: "Ação",
    cell: ({ row }) => {
      const { mutations } = useTableData({
        planningId: row.original.planning_id,
      });
      return (
        <TableDeleteCell
          deleteMutation={mutations.deleteVariableExpenseMutation}
          recordId={row.original.id}
        />
      );
    },
  },
  {
    accessorKey: "expense_name",
    header: "Despesa",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="variable_expense"
          updateKey="expense_name"
          recordId={row.original.id}
          initialValue={row.original.expense_name}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "purchase_date",
    header: "Data de compra",
    cell: ({ row }) => {
      return (
        <TableDateCell
          entityName="variable_expense"
          updateKey="purchase_date"
          recordId={row.original.id}
          initialValue={row.original.purchase_date}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      return (
        <TableFinanceCell
          entityName="variable_expense"
          updateKey="value"
          recordId={row.original.id}
          initialValue={String(row.original.value)}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "observations",
    header: "Observações",
    cell: ({ row }) => {
      return (
        <TableTextareaCell
          entityName="variable_expense"
          updateKey="observations"
          recordId={row.original.id}
          initialValue={row.original.observations}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
];
