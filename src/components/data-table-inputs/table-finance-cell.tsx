"use client";

import { Input } from "../ui/input";
import TableCellContainer from "./table-cell-container";
import { BaseTableCellProps } from "./types";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type TableFinanceCellProps = {
  disabled?: boolean;
} & BaseTableCellProps;
export default function TableFinanceCell({
  initialValue,
  disabled = false,
  entityName,
  recordId,
  updateElementByIdRequest,
  refetchCallback,
  updateKey,
}: TableFinanceCellProps) {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const debouncedValue = useDebounce(currentValue, 500);
  const hasMounted = useRef(false);

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
      <div className="grid w-full max-w-sm items-center gap-1.5 h-full">
        <div className="relative h-full">
          <div
            className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
              { "z-20": focused }
            )}
          >
            <span className="text-muted-foreground">R$</span>
          </div>
          <Input
            disabled={disabled}
            id="currency"
            type="number"
            min={0}
            max={10000}
            step={0.01}
            placeholder="0.00"
            value={String(currentValue)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setCurrentValue(e.target.value)}
            className={cn("pl-9 h-full", {
              "absolute top-0 left-0 w-64  z-10 flex": focused,
            })}
          />
        </div>
      </div>
    </TableCellContainer>
  );
}
