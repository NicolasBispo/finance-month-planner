import apiClient from "@/config/api-client";
import { ListPlanningsResponse, ShowPlanningResponse } from "@/types/responses/planning.responses";
const endpoints = {
  list: "/plannings",
  show: (id: number) => `/plannings/${id}`,
};
async function list(params?: URLSearchParams) {
  const { data } = await apiClient<ListPlanningsResponse>({
    method: "GET",
    url: endpoints.list,
    params: {
      ...params,
    },
  });
  return data;
}

async function show(id: number) {
  const { data } = await apiClient<ShowPlanningResponse>({
    method: "GET",
    url: endpoints.show(id),
  });
  return data
}

const PlanningRequests = {
  list,
  show
};
export default PlanningRequests;
