/* eslint-disable react-hooks/rules-of-hooks */
import TableBooleanCell from "@/components/data-table-inputs/table-boolean-cell";
import { TableDateCell } from "@/components/data-table-inputs/table-date-cell";
import TableDeleteCell from "@/components/data-table-inputs/table-delete-cell";
import TableFinanceCell from "@/components/data-table-inputs/table-finance-cell";
import { TableTextCell } from "@/components/data-table-inputs/table-text-cell";
import useTableData from "@/hooks/use-table-data";
import FixedExpenseRequests from "@/requests/fixed-expenses.requests";
import FixedExpense from "@/types/entities/fixed_expense.entity";
import { ColumnDef } from "@tanstack/react-table";

const updateElementByIdRequest = async (
  recordId: number,
  updateKey: string,
  updateValue: unknown
) => {
  return await FixedExpenseRequests.update(recordId, {
    [updateKey as keyof FixedExpense]: updateValue,
  });
};


function refetchFunction(planningId: number) {
  const {
    queries: { fixedExpensesQuery },
  } = useTableData({ planningId });
  return fixedExpensesQuery.refetch;
}

export const fixedExpenseColumns: ColumnDef<FixedExpense>[] = [
  {
    id: "actions",
    header: "Ação",
    cell: ({ row }) => {
      const { mutations } = useTableData({
        planningId: row.original.planning_id,
      });
      return (
        <TableDeleteCell
          deleteMutation={mutations.deleteFixedExpenseMutation}
          recordId={row.original.id}
        />
      );
    },
  },
  {
    accessorKey: "expense_type",
    header: "Tipo de despesa",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="expense_type"
          recordId={row.original.id}
          initialValue={row.original.expense_type}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "company_name",
    header: "Nome da despesa",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="company_name"
          recordId={row.original.id}
          initialValue={row.original.company_name}
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
          entityName="fixed_expense"
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
    accessorKey: "due_date",
    header: "Data de vencimento",
    cell: ({ row }) => {
      return (
        <TableDateCell
          entityName="fixed_expense"
          updateKey="due_date"
          recordId={row.original.id}
          initialValue={row.original.due_date}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "paid_every",
    header: "Pago todo dia",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="paid_every"
          recordId={row.original.id}
          initialValue={row.original.paid_every}
          type={"number"}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "is_paid",
    header: "Pago?",
    cell: ({ row }) => {
      return (
        <TableBooleanCell
          entityName="fixed_expense"
          updateKey="is_paid"
          recordId={row.original.id}
          initialValue={row.original.is_paid}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "was_paid_day",
    header: "Foi pago dia",
    cell: ({ row }) => {
      return (
        <TableDateCell
          entityName="fixed_expense"
          updateKey="was_paid_day"
          recordId={row.original.id}
          initialValue={row.original.was_paid_day}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "is_financed",
    header: "Parcelado?",
    cell: ({ row }) => {
      return (
        <TableBooleanCell
          entityName="fixed_expense"
          updateKey="is_financed"
          recordId={row.original.id}
          initialValue={row.original.is_financed}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "times_financed",
    header: "Total de parcelas",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="times_financed"
          recordId={row.original.id}
          initialValue={row.original.times_financed}
          updateElementByIdRequest={updateElementByIdRequest}
          type="number"
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "current_finance",
    header: "Parcela atual",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="current_finance"
          recordId={row.original.id}
          initialValue={row.original.current_finance}
          type="number"
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    header: "Parcelas restantes",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="fixed_expense"
          updateKey="current_finance"
          recordId={row.original.id}
          initialValue={
            row.original.times_financed - row.original.current_finance
          }
          type="number"
          disabled
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "overdue",
    header: "Em atraso?",
    cell: ({ row }) => {
      return (
        <TableBooleanCell
          entityName="fixed_expense"
          updateKey="overdue"
          recordId={row.original.id}
          initialValue={row.original.overdue}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
];
