import apiClient from "@/config/api-client";
import VariableExpense from "@/types/entities/variable_expense.entity";

const endpoints = {
  listByPlanningId: (planningId: number) =>
    `/plannings/${planningId}/variable_expenses`,
  update: (variable_expense_id: number) =>
    `/variable_expenses/${variable_expense_id}`,
  create: (planningId: number) => `/plannings/${planningId}/variable_expenses`,
};
async function listByPlanningId(planningId: number) {
  const { data } = await apiClient<VariableExpense[]>({
    method: "GET",
    url: endpoints.listByPlanningId(planningId),
  });
  return data;
}

type UpdateVariableExpense = {
  expense_name?: string;
  purchase_date?: Date;
  value?: number;
  observations?: string;
};
async function update(
  variable_expense_id: number,
  payload_data: UpdateVariableExpense
) {
  const { data } = await apiClient<VariableExpense>({
    method: "PUT",
    url: endpoints.update(variable_expense_id),
    data: {
      ...payload_data,
    },
  });
  return data;
}

async function create(planning_id: number) {
  const { data } = await apiClient<VariableExpense>({
    method: "POST",
    url: endpoints.create(planning_id),
    data: {
      expense_name: "",
      purchase_date: new Date(),
      value: 0,
      observations: "",
      planning_id,
    },
  });
  return data;
}

async function deleteById(variable_expense_id: number) {
  const { data } = await apiClient({
    method: "DELETE",
    url: endpoints.update(variable_expense_id),
  });
  return data;
}

const VariableExpensesRequests = {
  create,
  update,
  listByPlanningId,
  delete: deleteById,
};

export default VariableExpensesRequests;
