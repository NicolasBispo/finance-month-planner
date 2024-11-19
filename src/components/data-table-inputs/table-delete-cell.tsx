"use client"
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";
import TableCellContainer from "./table-cell-container";
import { UseTableDataDeleteMutationParams } from "@/hooks/use-table-data";
import { X } from "lucide-react";

type TableDeleteCellProps = {
  deleteMutation: UseMutationResult<
    void,
    Error,
    UseTableDataDeleteMutationParams,
    unknown
  >;
  recordId: number;
};
export default function TableDeleteCell({
  deleteMutation,
  recordId,
}: TableDeleteCellProps) {
  return (
    <TableCellContainer className="w-fit flex items-center max-w-fit">
      <Button
        variant={"destructive"}
        className="size-7"
        onClick={() => {
          deleteMutation.mutateAsync({
            id: recordId,
          });
        }}
      >
        <X />
      </Button>
    </TableCellContainer>
  );
}
