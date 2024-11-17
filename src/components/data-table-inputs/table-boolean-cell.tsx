"use client";

import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { BaseTableCellProps } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TableCellContainer from "./table-cell-container";

type TableBooleanCellProps = {
  initialValue: boolean;
  placeholder?: string;
} & BaseTableCellProps;

export default function TableBooleanCell({
  entityName,
  initialValue,
  placeholder,
  recordId,
  updateElementByIdRequest,
  updateKey,
  refetchCallback
}: TableBooleanCellProps) {
  const isInitialized = useRef(false);

  const updateMutation = useMutation({
    mutationKey: ["update", entityName, recordId],
    mutationFn: async ({ updateValue }: { updateValue: boolean }) => {
      return await updateElementByIdRequest(recordId, updateKey, updateValue);
    },
    onSuccess: async () => {
      await refetchCallback()
    },
  });

  const onChangeSelect = async (updateValue: boolean) => {
    await updateMutation.mutateAsync({
      updateValue,
    });
  };

  return (
    <TableCellContainer>
      <Select
        defaultValue={JSON.stringify(initialValue)}
        onValueChange={(value) => {
          // Prevent the initial call
          if (!isInitialized.current) {
            isInitialized.current = true;
            return;
          }
          onChangeSelect(Boolean(value));
        }}
      >
        <SelectTrigger className="w-full h-full bg-background">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Sim</SelectItem>
          <SelectItem value="false">Não</SelectItem>
        </SelectContent>
      </Select>
    </TableCellContainer>
  );
}
