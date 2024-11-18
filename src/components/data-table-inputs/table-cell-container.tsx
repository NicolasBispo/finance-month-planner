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
      className={cn("relative w-full h-12 flex max-h-12 min-h-12 justify-center px-2 py-1", className)}
    >
      {children}
    </div>
  );
}
