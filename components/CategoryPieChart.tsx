import React from "react";
import { Chart } from "react-google-charts";

type CategoryData = {
  category: string;
  amount: number;
};

const CategoryPieChart = ({ data }: { data: CategoryData[] }) => {
  const chartData = [
    ["Category", "Amount"],
    ...data.map(item => [item.category, item.amount]),
  ];

  const options = {
    title: "Expenses by Category",
    pieHole: 0.4,
    is3D: false,
    legend: { position: "right", textStyle: { fontSize: 12 } },
    chartArea: { width: "90%", height: "75%" },
    colors: ["#4F46E5", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#E879F9"],
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">Category-wise Breakdown</h3>
      <Chart
        chartType="PieChart"
        width="100%"
        height="300px"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default CategoryPieChart;
