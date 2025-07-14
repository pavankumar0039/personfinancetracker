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
        if (!selectedYear) {
            toast.error("Please select a year.");
            return;
        }

        if (selectedMonthIndex === null) {
            toast.error("Please select a month.");
            return;
        }

        const monthStr = String(selectedMonthIndex + 1).padStart(2, "0");
        const finalDate = `${selectedYear}-${monthStr}-${selectedDay}`;

        // If selected date not in data, warn but still allow
        if (!data.includes(finalDate)) {
            toast.warn(`No transactions found on ${selectedDay} ${monthsFull[selectedMonthIndex]} ${selectedYear}`);
        } else {
            toast.success(`Selected Date: ${finalDate}`);
        }

        if (onDateSelect) onDateSelect(finalDate);
    };

    const resetAll = () => {
        setSelectedYear(null);
        setSelectedMonthIndex(null);
        setSelectedDay(null);
    };

    return (
        <div className="w-full mx-auto px-6 py-2 pb-6 bg-white rounded-xl shadow-md space-y-4">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="py-1">
                <h2 className="text-xl font-bold text-gray-800 m-0 p-0">Select Date</h2>
                <p className="text-sm text-gray-600 p-0 m-0">You can check particular details of your transactions.</p>
            </div>
            <p className="text-md text-gray-700 pb-2 m-0 ">
                <strong>Tracking Date:</strong>{" "}
                {selectedYear
                    ? `${selectedDay == null ? "" : selectedDay} ${selectedMonthIndex != null ? monthsFull[selectedMonthIndex] : ""} ${selectedYear}`
                    : "Not selected"}
            </p>

            {/* Year Selector */}
            {!selectedYear && (
                <div>
                    <p className="text-gray-600 font-medium mb-2">Select Year</p>
                    <div className="flex flex-wrap gap-2">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Month Selector */}
            {selectedYear && selectedMonthIndex === null && (
                <div>
                    <p className="text-gray-600 font-medium mb-2">Select Month</p>
                    <div className="grid grid-cols-4 gap-2">
                        {monthsFull.map((name, idx) => {
                            const hasData = validDatesByMonth[idx]?.size > 0;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleMonthClick(idx)}
                                    className={`px-3 py-2 rounded-md text-sm 
                                        ${hasData ? "bg-blue-300" : "bg-gray-100"}
                                        hover:bg-gray-200`}
                                >
                                    {name}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        onClick={resetAll}
                        className="mt-4 text-sm text-blue-600 hover:underline"
                    >
                        Change Year
                    </button>
                </div>
            )}

            {/* Day Selector */}
            {selectedYear && selectedMonthIndex !== null && (
                <div>
                    <p className="text-gray-600 font-medium mb-2">
                        Select Day in {monthsFull[selectedMonthIndex]} {selectedYear}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {getDaysInMonth(parseInt(selectedYear), selectedMonthIndex).map((day) => {
                            const isValid = validDatesByMonth[selectedMonthIndex]?.has(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`px-3 py-2 rounded-md text-sm
                                        ${selectedDay === day
                                            ? "bg-blue-600 text-white"
                                            : isValid
                                                ? "bg-blue-300"
                                                : "bg-blue-100"
                                        }
                                        hover:bg-blue-200`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => setSelectedMonthIndex(null)}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Change Month
                        </button>
                        <button
                            onClick={resetAll}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Reset All
                        </button>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
                <button
                    onClick={handleSubmit}
                    className="w-[220px] bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default DateSelector;
