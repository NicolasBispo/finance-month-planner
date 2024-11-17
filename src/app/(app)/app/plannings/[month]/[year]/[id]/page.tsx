"use client";

import { DataTable } from "@/components/ui/data-table";
import {
  PageContainer,
  PageContent,
  PageHeader,
} from "@/components/ui/page-container";
import PlanningRequests from "@/requests/planning.requests";
import { getMonthName } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { capitalize } from "lodash";
import { useParams } from "next/navigation";
import { fixedExpenseColumns } from "./fixed_expenses_columns";
import { variableExpenseColumns } from "./variable_expenses_columns";
import { Button } from "@/components/ui/button";
import useTableData from "@/hooks/use-table-data";
import { receiptsColumns } from "./receipts_columns";
import { useEffect } from "react";

export type PlanningDetailsUrlParams = {
  month: string;
  year: string;
  id: string;
};
export default function PlanningDetailsPage() {
  const { id } = useParams<PlanningDetailsUrlParams>();

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["planning", id],
    queryFn: async () => PlanningRequests.show(Number(id)),
  });

  const { queries, mutations } = useTableData({
    planningId: Number(id),
  });

  const { fixedExpensesQuery, variableExpensesQuery, receiptsQuery } = queries;

  useEffect(() => {
    fixedExpensesQuery.refetch();
    variableExpensesQuery.refetch();
    receiptsQuery.refetch();
  }, []);
  const fixedExpenses = fixedExpensesQuery.data || [];
  const variableExpenses = variableExpensesQuery.data || [];
  const receipts = receiptsQuery.data || [];

  if (!data && !isLoading && isRefetching) {
    return "Nao encontrada";
  }
  return (
    <PageContainer
      blockingConditions={!data && !isLoading}
      isLoading={isLoading}
      data={data}
    >
      <PageHeader>
        Planejamento de {capitalize(getMonthName(data?.month || 1))} -{" "}
        {data?.year}
      </PageHeader>
      <PageContent>
        <div className="flex flex-col gap-4 w-full px-2">
          <div className="flex flex-col gap-2">
            <span>Despesas Fixas</span>
            <DataTable columns={fixedExpenseColumns} data={fixedExpenses} />
            <Button
              variant={"outline"}
              onClick={() =>
                mutations.createFixedExpenseMutation.mutateAsync({
                  planning_id: Number(id),
                })
              }
            >
              Adicionar nova
            </Button>
          </div>
          <hr />
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2 h-full min-h-full">
              <span>Despesas variáveis</span>
              <DataTable
                columns={variableExpenseColumns}
                data={variableExpenses}
              />
              <Button
                variant={"outline"}
                onClick={() =>
                  mutations.createVariableExpenseMutation.mutateAsync({
                    planning_id: Number(id),
                  })
                }
              >
                Adicionar nova
              </Button>
            </div>
            <div className="flex flex-col gap-2 h-full min-h-full">
              <span>Recebimentos</span>
              <DataTable columns={receiptsColumns} data={receipts} />
              <Button
                variant={"outline"}
                onClick={() =>
                  mutations.createReceiptMutation.mutateAsync({
                    planning_id: Number(id),
                  })
                }
              >
                Adicionar nova
              </Button>
            </div>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
