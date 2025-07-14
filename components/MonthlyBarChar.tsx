"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";



ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyBarChart = () => {

    const data = {
        labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        datasets: [
            {
                label: "Expenses (₹)",
                data: [1200, 900, 1400, 1100, 1600, 1000, 1800, 1300, 950, 1450, 1700, 1200],
                backgroundColor: "rgba(59, 130, 246, 0.6)", 
                borderRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `₹ ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (tickValue: string | number) {
                        return `₹${tickValue}`;
                    },
                },
            },
        },
    } as const;


    return (
        <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Monthly Expense Overview</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthlyBarChart;
