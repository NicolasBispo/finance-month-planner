/* eslint-disable react-hooks/rules-of-hooks */
import TableFinanceCell from "@/components/data-table-inputs/table-finance-cell";
import FixedExpense from "@/types/entities/fixed_expense.entity";
import Receipt from "@/types/entities/receipt.entity";
import VariableExpense from "@/types/entities/variable_expense.entity";
import { ColumnDef } from "@tanstack/react-table";

const updateElementByIdRequest = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _recordId: number,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateKey: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _updateValue: unknown
) => {
  return await Promise.resolve();
};
export type FinanceResult = {
  fixed_expenses: FixedExpense[];
  variable_expenses: VariableExpense[];
  receipts: Receipt[];
};
export const financeResultColumns: ColumnDef<FinanceResult>[] = [
  {
    id: "total_receipts",
    header: "Total de faturamento",
    cell: ({ row }) => {
      const totalReceipts = row.original.receipts
        .map((receipt) => receipt.value)
        .reduce((prev, next) => (prev += next), 0);
      return (
        <TableFinanceCell
          disabled
          recordId={0}
          entityName="variable_expense"
          updateKey="due_date"
          initialValue={totalReceipts}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={async () => null}
        />
      );
    },
  },
  {
    id: "total_fixed_expenses",
    header: "Total de despesas fixas",
    cell: ({ row }) => {
      const totalValue = row.original.fixed_expenses
        .map((fixed_expense) => fixed_expense.value)
        .reduce((prev, next) => (prev += next), 0);
      return (
        <TableFinanceCell
          disabled
          recordId={0}
          entityName=""
          updateKey=""
          initialValue={totalValue}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={async () => null}
        />
      );
    },
  },
  {
    id: "total_variable_expenses",
    header: "Total de despesas variáveis",
    cell: ({ row }) => {
      const totalValue = row.original.variable_expenses
        .map((variable_expense) => variable_expense.value)
        .reduce((prev, next) => (prev += next), 0);
      return (
        <TableFinanceCell
          disabled
          recordId={0}
          entityName=""
          updateKey=""
          initialValue={totalValue}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={async () => null}
        />
      );
    },
  },
  {
    id: "total_balance",
    header: "Saldo total",
    cell: ({ row }) => {
      const { variable_expenses, fixed_expenses, receipts } = row.original;

      const totalReceipts = receipts
        .map((receipt) => receipt.value)
        .reduce((prev, next) => (prev += next), 0);

      const totalFixedExpenses = fixed_expenses
        .map((receipt) => receipt.value)
        .reduce((prev, next) => (prev += next), 0);

      const totalVariableExpenses = variable_expenses
        .map((variable_expense) => variable_expense.value)
        .reduce((prev, next) => (prev += next), 0);

      const totalValues = (
        totalReceipts -
        (totalFixedExpenses + totalVariableExpenses)
      ).toFixed(2);
      return (
        <TableFinanceCell
          disabled
          recordId={0}
          entityName=""
          updateKey=""
          initialValue={totalValues}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={async () => null}
        />
      );
    },
  },
];
