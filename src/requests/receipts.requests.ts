import apiClient from "@/config/api-client";
import Receipt from "@/types/entities/receipt.entity";

const endpoints = {
  listByPlanningId: (planningId: number) => `/plannings/${planningId}/receipts`,
  update: (receipt_id: number) => `/receipts/${receipt_id}`,
  create: (planningId: number) => `/plannings/${planningId}/receipts`,
};
async function listByPlanningId(planningId: number) {
  const { data } = await apiClient<Receipt[]>({
    method: "GET",
    url: endpoints.listByPlanningId(planningId),
  });

  return data;
}

type ReceiptUpdatePayload = {
  receipt_day?: Date;
  receipt_type?: string;
  value?: number;
};
async function update(recordId: number, payload: ReceiptUpdatePayload) {
  const { data } = await apiClient<Receipt>({
    method: "PUT",
    url: endpoints.update(recordId),
    data: {
      receipt: {
        ...payload,
      },
    },
  });
  return data;
}

async function deleteById(receipt_id: number) {
  const { data } = await apiClient({
    method: "DELETE",
    url: endpoints.update(receipt_id),
  });
  return data;
}

async function create(planning_id: number) {
  const { data } = await apiClient<Receipt>({
    method: "POST",
    url: endpoints.create(planning_id),
    data: {
      receipt: {
        receipt_type: "",
        value: 0,
        planning_id,
      },
    },
  });
  return data;
}

const ReceiptRequests = {
  listByPlanningId,
  update,
  create,
  delete: deleteById,
};

export default ReceiptRequests;
