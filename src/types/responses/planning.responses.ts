import FixedExpense from "../entities/fixed_expense.entity";
import Planning from "../entities/planning.entity";
import Receipt from "../entities/receipts.entity";
import VariableExpense from "../entities/variable_expense.entity";
import { PaginatedResults } from "./pagination.response";

export type ListPlanningsResponse = PaginatedResults<Planning>;

export type ShowPlanningResponse = Planning & {
  variable_expenses: VariableExpense[];
  fixed_expenses: FixedExpense[];
  receipts: Receipt[];
};
