import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Report } from "@/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Income per day",
    },
  },
};

export default function DataVisualization({
  rangeReport,
}: {
  rangeReport: Report[];
}) {
  const labels = rangeReport.map((r) => r.date);
  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: rangeReport.map((r) => r.totalSum),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
