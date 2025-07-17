"use client";

import React, { useState } from "react";
import { format, addMonths, subMonths, startOfWeek, addDays, getDay, getDate } from "date-fns";

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday start

  const days = [...Array(7)].map((_, i) => {
    const date = addDays(startDate, i);
    return {
      dayName: format(date, "EEE"),
      dayNumber: format(date, "d"),
      fullDate: date,
    };
  });

  const isSelected = (date:any) =>
    getDate(date) === getDate(selectedDate) &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

  return (
    <div className="rounded-xl p-4 w-full max-w-md bg-white shadow-md mx-auto">
      <div className="text-sm font-semibold text-gray-500 mb-1">Schedule</div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevWeek}>&lt;</button>
        <div className="text-lg font-medium text-gray-700">
          {format(currentDate, "MMMM yyyy")}
        </div>
        <button onClick={handleNextWeek}>&gt;</button>
      </div>

      <div className="flex justify-between items-center space-x-2">
        {days.map(({ dayName, dayNumber, fullDate }) => (
          <div
            key={dayName}
            onClick={() => setSelectedDate(fullDate)}
            className={`flex flex-col items-center cursor-pointer transition-all duration-200 px-2 py-2 rounded-lg ${
              isSelected(fullDate) ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-xs">{dayName}</span>
            <span className="text-lg font-semibold">{dayNumber}</span>
            {isSelected(fullDate) && (
              <span className="text-xs mt-1">📅</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
