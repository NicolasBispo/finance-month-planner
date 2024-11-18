"use client";

import { TabsContent } from "@/components/ui/tabs";
import { ChartData, ArcElement, Chart } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement);
export default function ChartTab() {
  const chartData: ChartData<"pie"> = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <TabsContent value="chart">
      <div className="w-full grid grid-cols-12 gap-4">
        <div className="col-span-3">
          <h3 className="text-lg font-semibold mb-4">Pie Chart</h3>
          <Pie data={chartData} />
        </div>
        <div className="col-span-9">
          <h3 className="text-lg font-semibold mb-4">Other Content</h3>
          <p>Adicione conteúdo relevante ou visualizações adicionais aqui.</p>
        </div>
      </div>
    </TabsContent>
  );
}
