export default interface VariableExpense {
  id: number;
  expense_name: string;
  purchase_date: Date;
  value: number;
  observations: string;
  planning_id: number
  created_at: Date;
  updated_at: Date;
}
