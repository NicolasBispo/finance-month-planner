"use client";

import { HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation } from "@tanstack/react-query";
import { BaseTableCellProps } from "./types";
import TableCellContainer from "./table-cell-container";
import { cn } from "@/lib/utils";

type TableTextInputProps = {
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  initialValue: string | number;
} & BaseTableCellProps;

export function TableTextCell({
  initialValue,
  recordId,
  entityName,
  updateKey,
  updateElementByIdRequest,
  type = "text",
  disabled = false,
  refetchCallback
}: TableTextInputProps) {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const debouncedValue = useDebounce(currentValue, 500);
  const hasMounted = useRef(false); // Ref para verificar se o componente já montou

  const updateMutation = useMutation({
    mutationKey: ["update", entityName, recordId],
    mutationFn: async ({ updateValue }: { updateValue: string }) => {
      return await updateElementByIdRequest(recordId, updateKey, updateValue);
    },
    onSuccess: async () => {
      await refetchCallback()
    },
  });

  useEffect(() => {
    // Garante que o efeito será ignorado na montagem inicial
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    // Executa a mutação após mudanças no valor debounced
    if (debouncedValue !== initialValue) {
      updateMutation.mutateAsync({
        updateValue: String(debouncedValue),
      });
    }
  }, [debouncedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TableCellContainer>
      <Input
        className={cn("w-full", {
          "absolute top-0 left-0 w-64  z-10 flex": focused,
        })}
        type={type}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={String(currentValue)}
        disabled={disabled}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
    </TableCellContainer>
  );
}
