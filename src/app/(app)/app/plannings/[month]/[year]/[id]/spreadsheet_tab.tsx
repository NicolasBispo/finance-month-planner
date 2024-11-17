"use client";

import { DataTable } from "@/components/ui/data-table";
import { TabsContent } from "@radix-ui/react-tabs";
import { fixedExpenseColumns } from "./fixed_expenses_columns";
import FixedExpense from "@/types/entities/fixed_expense.entity";
import VariableExpense from "@/types/entities/variable_expense.entity";
import Receipt from "@/types/entities/receipt.entity";
import { Button } from "@/components/ui/button";
import useTableData from "@/hooks/use-table-data";
import { variableExpenseColumns } from "./variable_expenses_columns";
import { receiptsColumns } from "./receipts_columns";
type SpreadsheetTabProps = {
  planning_id: number;
  fixedExpenses: FixedExpense[];
  variableExpenses: VariableExpense[];
  receipts: Receipt[];
};
export default function SpreadsheetTab({
  planning_id,
  fixedExpenses,
  variableExpenses,
  receipts,
}: SpreadsheetTabProps) {
  const {mutations} = useTableData({ planningId: planning_id });

  return (
    <TabsContent value="spreadsheet">
      <div className="flex flex-col gap-4 w-full px-2">
        <div className="flex flex-col gap-2">
          <span>Despesas Fixas</span>
          <DataTable columns={fixedExpenseColumns} data={fixedExpenses} />
          <Button
            variant={"outline"}
            onClick={() =>
              mutations.createFixedExpenseMutation.mutateAsync({
                planning_id,
              })
            }
          >
            Adicionar nova
          </Button>
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 h-full min-h-full">
            <span>Despesas variáveis</span>
            <DataTable
              columns={variableExpenseColumns}
              data={variableExpenses}
            />
            <Button
              variant={"outline"}
              onClick={() =>
                mutations.createVariableExpenseMutation.mutateAsync({
                  planning_id,
                })
              }
            >
              Adicionar nova
            </Button>
          </div>
          <div className="flex flex-col gap-2 h-full min-h-full">
            <span>Recebimentos</span>
            <DataTable columns={receiptsColumns} data={receipts} />
            <Button
              variant={"outline"}
              onClick={() =>
                mutations.createReceiptMutation.mutateAsync({
                  planning_id,
                })
              }
            >
              Adicionar nova
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
