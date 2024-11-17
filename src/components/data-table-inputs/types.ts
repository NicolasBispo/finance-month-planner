export type UpdateElementByIdRequestCallback = (
  recordId: number,
  updateKey: string,
  updateValue: unknown
) => Promise<unknown>;

export interface BaseTableCellProps {
  updateKey: string
  recordId: number;
  entityName: string;
  updateElementByIdRequest: UpdateElementByIdRequestCallback;
  initialValue: unknown
  refetchCallback: () => Promise<unknown>
}
