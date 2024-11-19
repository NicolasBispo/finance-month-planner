/* eslint-disable react-hooks/rules-of-hooks */
import { TableDateCell } from "@/components/data-table-inputs/table-date-cell";
import TableDeleteCell from "@/components/data-table-inputs/table-delete-cell";
import TableFinanceCell from "@/components/data-table-inputs/table-finance-cell";
import { TableTextCell } from "@/components/data-table-inputs/table-text-cell";
import useTableData from "@/hooks/use-table-data";
import ReceiptRequests from "@/requests/receipts.requests";
import Receipt from "@/types/entities/receipt.entity";
import { ColumnDef } from "@tanstack/react-table";

const updateElementByIdRequest = async (
  recordId: number,
  updateKey: string,
  updateValue: unknown
) => {
  return await ReceiptRequests.update(recordId, {
    [updateKey as keyof Receipt]: updateValue,
  });
};


function refetchFunction(planningId: number) {
  const {
    queries: { receiptsQuery },
  } = useTableData({ planningId });
  return receiptsQuery.refetch;
}
export const receiptsColumns: ColumnDef<Receipt>[] = [
  {
    id: "action_cell",
    header: "Ação",
    cell: ({ row }) => {
      const { mutations } = useTableData({
        planningId: row.original.planning_id,
      });
      return (
        <TableDeleteCell
          deleteMutation={mutations.deleteReceiptMutation}
          recordId={row.original.id}
        />
      );
    },
  },
  {
    accessorKey: "receipt_day",
    header: "Dia de recebimento",
    cell: ({ row }) => {
      return (
        <TableDateCell
          entityName="receipt"
          updateKey="receipt_day"
          recordId={row.original.id}
          initialValue={row.original.receipt_day}
          updateElementByIdRequest={updateElementByIdRequest}
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
  {
    accessorKey: "receipt_type",
    header: "Tipo de recebimento",
    cell: ({ row }) => {
      return (
        <TableTextCell
          entityName="receipt"
          updateKey="receipt_type"
          recordId={row.original.id}
          initialValue={row.original.receipt_type || ""}
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
          entityName="receipt"
          updateKey="value"
          recordId={row.original.id}
          initialValue={String(row.original.value)}
          updateElementByIdRequest={updateElementByIdRequest}
          
          refetchCallback={refetchFunction(row.original.planning_id)}
        />
      );
    },
  },
];
