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
      className={cn("relative min-h-12 px-2 py-1 w-full flex items-center justify-center", className)}
    >
      {children}
    </div>
  );
}
