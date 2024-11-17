import apiClient from "@/config/api-client";
import FixedExpense from "@/types/entities/fixed_expense.entity";

const endpoints = {
  listByPlanningId: (planningId: number) =>
    `/plannings/${planningId}/fixed_expenses`,
  create: (planningId: number) => `/plannings/${planningId}/fixed_expenses`,
  update: (fixedExpenseId: number) => `/fixed_expenses/${fixedExpenseId}`,
};
async function listByPlanningId(planningId: number) {
  const { data } = await apiClient<FixedExpense[]>({
    method: "GET",
    url: endpoints.listByPlanningId(planningId),
  });
  return data;
}

type FixedExpenseUpdatePayload = {
  expense_type?: string;
  company_name?: string;
  value?: number;
  due_date?: Date;
  paid_every?: number;
  is_paid?: boolean;
  was_paid_day?: number;
  is_financed?: boolean;
  times_financed?: number;
  current_finance?: number;
  overdue?: boolean;
  planning_id?: number;
};
async function update(recordId: number, payload: FixedExpenseUpdatePayload) {
  const { data } = await apiClient<FixedExpense>({
    method: "PUT",
    url: endpoints.update(recordId),
    data: {
      fixed_expense: {
        ...payload,
      },
    },
  });
  return data;
}

async function deleteById(fixed_expense_id: number){
  const {data} = await apiClient({
    method: "DELETE",
    url: endpoints.update(fixed_expense_id)
  })
  return data
}

async function create(planning_id: number) {
  const { data } = await apiClient<FixedExpense>({
    method: "POST",
    url: endpoints.create(planning_id),
    data: {
      fixed_expense: {
        expense_type: "",
        company_name: "",
        value: 0,
        planning_id,
      },
    },
  });
  return data;
}

const FixedExpenseRequests = {
  listByPlanningId,
  update,
  create,
  delete: deleteById
};

export default FixedExpenseRequests;
