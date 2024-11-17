import { cn } from "@/lib/utils";
import React from "react";

export function Container({
  children,
  className,
  title,
  headerCompenent,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  headerCompenent?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "p-4 md:p-6 flex flex-col gap-4 w-full text-typography bg-background rounded-lg",
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-typography text-left capitalize">
            {title}
          </h1>
          {headerCompenent}
        </div>
      )}
      {children}
    </section>
  );
}
