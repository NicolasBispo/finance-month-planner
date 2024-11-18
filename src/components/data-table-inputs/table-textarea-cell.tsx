"use client";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import TableCellContainer from "./table-cell-container";
import { BaseTableCellProps } from "./types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type TableTextareaCellProps = {
  initialValue: string;
} & BaseTableCellProps;

export default function TableTextareaCell({
  initialValue,
  recordId,
  entityName,
  updateKey,
  updateElementByIdRequest,
  refetchCallback,
}: TableTextareaCellProps) {
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
      await refetchCallback();
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
      <Textarea
        className={cn("w-full p-3 min-h-full bg-background max-h-full", {
          "absolute top-0 left-0 w-64 z-[99]": focused,
        })}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={String(currentValue)}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
    </TableCellContainer>
  );
}
