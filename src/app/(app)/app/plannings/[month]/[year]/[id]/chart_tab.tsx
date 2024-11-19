"use client";

import { renderChartData } from "@/charts/finance-pie-chart";
import { TabsContent } from "@/components/ui/tabs";
import { sumEntitiesValues } from "@/helpers/finance-helper";
import useFinanceCalc from "@/hooks/use-finance-calc";
import FixedExpense from "@/types/entities/fixed_expense.entity";
import Receipt from "@/types/entities/receipt.entity";
import VariableExpense from "@/types/entities/variable_expense.entity";
import { Pie } from "react-chartjs-2";

type ChartTabProps = {
  fixed_expenses: FixedExpense[];
  variable_expenses: VariableExpense[];
  receipts: Receipt[];
};
export default function ChartTab({
  fixed_expenses,
  variable_expenses,
  receipts,
}: ChartTabProps) {
  const { getTotalValuesChartData, getFutureDebtsChartData } = useFinanceCalc({
    fixed_expenses,
    variable_expenses,
    receipts,
  });

  const { chartData: totalChartData, chartOptions } = renderChartData(
    getTotalValuesChartData(),
    ["Despesas Variáveis", "Despesas fixas", "Receitas"],
    [
      sumEntitiesValues(variable_expenses).toFixed(2),
      sumEntitiesValues(fixed_expenses).toFixed(2),
      sumEntitiesValues(receipts).toFixed(2),
    ]
  );

  const { chartData: futureChartData } = renderChartData(
    getFutureDebtsChartData(),
    ["Despesas Fixas restantes", "Receitas a receber"],
    [
      sumEntitiesValues(fixed_expenses).toFixed(2),
      sumEntitiesValues(receipts).toFixed(2),
    ],
    ["rgb(54, 162, 235)", "#39fc03"]
  );

  return (
    <TabsContent value="chart">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-3 flex flex-col gap-2 border-r">
          <span className="text-center text-xl">
            Gráfico de planejamento total
          </span>
          <Pie data={totalChartData} options={chartOptions} />
        </div>
        <div className="col-span-3 flex flex-col gap-2 border-r">
          <span className="text-center text-xl">Gastos e receitas futuras</span>
          <Pie data={futureChartData} options={chartOptions} />
        </div>
      </div>
    </TabsContent>
  );
}
