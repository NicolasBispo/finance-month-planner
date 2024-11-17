/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";

export function DatePicker({
  initialDate,
  onChangeDate,
  className,
}: {
  initialDate?: Date;
  onChangeDate: (date: Date) => void;
  className?: string;
}) {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  React.useEffect(() => {
    if (date) onChangeDate(date);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full font-normal block px-1",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? (
            format(date, "dd/MM/yyyy", { locale: ptBR })
          ) : (
            <div className="flex items-center justify-center gap-1">
              <CalendarIcon className="m-0 p-0" />
              <span>Data</span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          //@ts-ignore
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
