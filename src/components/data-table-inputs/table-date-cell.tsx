import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { BaseTableCellProps } from "./types";
import { DatePicker } from "../ui/date-picker";
import TableCellContainer from "./table-cell-container";

type TableDateCellProps = {
  initialValue?: Date;
} & BaseTableCellProps;

export const TableDateCell = ({
  updateKey,
  initialValue,
  entityName,
  recordId,
  updateElementByIdRequest,
  refetchCallback,
}: TableDateCellProps) => {
  const [currentDate, setCurrentDate] = useState(initialValue);

  const updateMutation = useMutation({
    mutationKey: ["update", entityName, recordId],
    mutationFn: async ({ updateValue }: { updateValue: Date }) => {
      return await updateElementByIdRequest(recordId, updateKey, updateValue);
    },
    onSuccess: async () => {
      await refetchCallback();
    },
  });

  const onChangeDate = async (selectedDate: Date) => {
    // Only trigger mutation if the date has changed
    if (selectedDate !== currentDate) {
      setCurrentDate(selectedDate);
      await updateMutation.mutateAsync({
        updateValue: selectedDate,
      });
    }
  };

  return (
    <TableCellContainer>
      <DatePicker
        className={"overflow-hidden h-full"}
        onChangeDate={onChangeDate}
        initialDate={currentDate} // Manage the state internally
      />
    </TableCellContainer>
  );
};
