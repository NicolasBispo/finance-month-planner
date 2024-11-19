import {
  ChartData,
  ArcElement,
  Chart,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export function renderChartData(
  data: number[],
  labels: string[],
  extraInfo: string[],
  backgroundColor?: string[]
) {
  const chartData: ChartData<"pie"> = {
    labels,
    datasets: [
      {
        label: "Valor:",
        data,
        backgroundColor: backgroundColor
          ? backgroundColor
          : ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "#39ff00 "],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<"pie"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            console.log("tooltip item", tooltipItem);
            const dataset = chartData.datasets[0];
            const index = tooltipItem.dataIndex;
            const value = dataset.data[index];
            const extra = extraInfo[index];
            console.log("valor ===>", value);
            return `Valor: R$${extra}`;
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data as number[];
          dataArr.map((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#000",
        anchor: "center",
      },
    },
  };
  return { chartData, chartOptions };
}
