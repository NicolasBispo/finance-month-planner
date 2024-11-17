import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TableCellContainerProps = {
  children: ReactNode;
  className?: string;
};
export default function TableCellContainer({
  children,
  className,
}: TableCellContainerProps) {
  return (
    <div
      className={cn("relative w-24 h-12 flex max-h-12 min-h-12 max-w-24", className)}
    >
      {children}
    </div>
  );
}
