"use client";
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
import useTableData from "@/hooks/use-table-data";
import { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpreadsheetTab from "./spreadsheet_tab";
import ChartTab from "./chart_tab";

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
    refetchOnWindowFocus: false
  });

  const { queries } = useTableData({
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
      <PageHeader className="flex items-center justify-between">
        Planejamento de {capitalize(getMonthName(data?.month || 1))} -{" "}
        {data?.year}
      </PageHeader>
      <PageContent>
        <Tabs defaultValue="chart" className="w-full">
          <div className="flex flex-col items-end">
            <span>Modo de visualização</span>
            <TabsList className="w-full justify-end">
              <TabsTrigger className="" value="spreadsheet">
                Tabela
              </TabsTrigger>
              <TabsTrigger value="chart">Gráfico</TabsTrigger>
            </TabsList>
          </div>
          <SpreadsheetTab
            fixedExpenses={fixedExpenses}
            variableExpenses={variableExpenses}
            receipts={receipts}
            planning_id={Number(id)}
          />
          <ChartTab
            fixed_expenses={fixedExpenses}
            variable_expenses={variableExpenses}
            receipts={receipts}
          />
        </Tabs>
      </PageContent>
    </PageContainer>
  );
}
