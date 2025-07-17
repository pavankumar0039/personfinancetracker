"use client";

import React, { useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DateSelectorProps = {
    data: string[]; // format: 'YYYY-MM-DD'
    onDateSelect?: (date: string) => void;
};

const monthsFull = [...Array(12)].map((_, i) =>
    new Date(2000, i).toLocaleString("default", { month: "short" })
);

const DateSelector: React.FC<DateSelectorProps> = ({ data, onDateSelect }) => {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const parsedData = useMemo(() => {
        return data.map((d) => {
            const [year, month, day] = d.split("-");
            return { year, month, day, date: d };
        });
    }, [data]);

    const years = useMemo(() => {
        return Array.from(new Set(parsedData.map((d) => d.year))).sort();
    }, [parsedData]);

    const validDatesByMonth: Record<number, Set<string>> = useMemo(() => {
        const result: Record<number, Set<string>> = {};
        parsedData
            .filter((d) => d.year === selectedYear)
            .forEach((d) => {
                const mIndex = parseInt(d.month) - 1;
                if (!result[mIndex]) result[mIndex] = new Set();
                result[mIndex].add(d.day);
            });
        return result;
    }, [parsedData, selectedYear]);

    const getDaysInMonth = (year: number, month: number): string[] => {
        const days = new Date(year, month + 1, 0).getDate();
        return Array.from({ length: days }, (_, i) => String(i + 1).padStart(2, "0"));
    };

    const handleMonthClick = (monthIndex: number) => {
        setSelectedMonthIndex(monthIndex);
        setSelectedDay(null);
    };

    const handleSubmit = () => {
        if (!selectedYear) return toast.error("Please select a year.");
        if (selectedMonthIndex === null) return toast.error("Please select a month.");

        const monthStr = String(selectedMonthIndex + 1).padStart(2, "0"); // e.g. "07"
        const yearStr = String(selectedYear); // e.g. "2025"

        if (selectedDay) {
            const dayStr = String(selectedDay).padStart(2, "0"); // e.g. "17"
            const fullDate = `${yearStr}-${monthStr}-${dayStr}`; // "2025-07-17"

            if (!data.includes(fullDate)) {
                toast.warn(`No transactions found on ${selectedDay} ${monthsFull[selectedMonthIndex]} ${selectedYear}`);
            } else {
                toast.success(`Selected Date: ${fullDate}`);
            }

            onDateSelect?.(fullDate);
        } else {
            const monthPrefix = `${yearStr}-${monthStr}`; // "2025-07"
            const hasMonthData = data.some(date => date.startsWith(monthPrefix));

            if (!hasMonthData) {
                toast.warn(`No transactions found for ${monthsFull[selectedMonthIndex]} ${selectedYear}`);
            } else {
                toast.success(`Showing transactions for ${monthsFull[selectedMonthIndex]} ${selectedYear}`);
            }

            onDateSelect?.(monthPrefix); // Pass only year-month if no day selected
        }
    };


    const resetAll = () => {
        setSelectedYear(null);
        setSelectedMonthIndex(null);
        setSelectedDay(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto px-6 py-6 bg-white rounded-2xl shadow-lg ">
            <ToastContainer position="top-right" autoClose={2500} />

            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Select a Date</h2>
                <p className="text-sm text-gray-600 mt-1">
                    Choose a specific date to check your transaction history.
                </p>
            </div>

            <div className="text-md text-gray-700 mb-4">
                <strong>Tracking Date:</strong>{" "}
                {selectedYear
                    ? `${selectedDay ?? "??"} ${monthsFull[selectedMonthIndex ?? 0]} ${selectedYear}`
                    : "Not selected"}
            </div>


            {/* Year Selector */}
            {!selectedYear && (
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">1️⃣ Select Year</h3>
                    <div className="flex flex-wrap gap-3">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-sm font-medium"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Month Selector */}
            {selectedYear && selectedMonthIndex === null && (
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">2️⃣ Select Month</h3>
                    <div className="grid grid-cols-4 gap-3">
                        {monthsFull.map((month, idx) => {
                            const hasData = validDatesByMonth[idx]?.size > 0;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleMonthClick(idx)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium 
                    ${hasData ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-600"}
                    hover:bg-blue-500 hover:text-white transition`}
                                >
                                    {month}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={resetAll}
                        className="mt-4 inline-block text-sm text-blue-600 cursor-pointer"
                    >
                        🔁 Change Year
                    </button>
                </section>
            )}

            {/* Day Selector */}
            {selectedYear && selectedMonthIndex !== null && (
                <section className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        3️⃣ Select Day in {monthsFull[selectedMonthIndex]} {selectedYear}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {getDaysInMonth(parseInt(selectedYear), selectedMonthIndex).map((day) => {
                            const isValid = validDatesByMonth[selectedMonthIndex]?.has(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition
                    ${selectedDay === day
                                            ? "bg-blue-600 text-white"
                                            : isValid
                                                ? "bg-blue-300 text-white"
                                                : "bg-gray-100 text-gray-600"
                                        }
                    hover:bg-blue-500 hover:text-white`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setSelectedMonthIndex(null)}
                            className="text-sm text-blue-500 cursor-pointer"
                        >
                            🔁 Change Month
                        </button>
                        <button
                            onClick={resetAll}
                            className="text-sm text-red-500 cursor-pointer"
                        >
                            Reset All
                        </button>
                    </div>
                </section>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-md"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DateSelector;
