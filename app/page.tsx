"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

// Component Imports

import AddHouseholdDrawer from "@/components/AddHouseholdDrawer";
import CategoryCards from "@/components/CategoryCards";
import CategoryPieChart from "@/components/CategoryPieChart";
import DateSelector from "@/components/DateSelector";
import MonthlyBarChart from "@/components/MonthlyBarChar";
import TransactionTable from "@/components/TransactionTable";



export default function Home() {
  const [tableData, setTableData] = useState<any[]>([]);
  const [datesData, setDatesData] = useState<any[]>([]);
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const fetchedRef = useRef(false);

  const AddHousehold = async (HouseholdName: string) => {
    const storedUser = localStorage.getItem("User");
    const User = storedUser ? JSON.parse(storedUser) : null;

    if (User?._id) {
      try {
        const response = await fetch("/api/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: HouseholdName, user: User._id }),
        });

        if (!response.ok) throw new Error("Failed to add household");

        const data = await response.json();
        toast.success("Household added successfully!");
        localStorage.setItem("household", JSON.stringify(data));
      } catch (error) {
        toast.error("Error adding household");
        console.error("Error:", error);
      }
    }
  };

  const handleDateSelect = (date: string) => {
    console.log("Selected Date:", date);
  };

  const gettingTransaction = async () => {
    try {
      const storedUser = localStorage.getItem("User");
      const User = storedUser ? JSON.parse(storedUser) : null;

      const response = await fetch(`/api/transaction?userId=${User._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to get transactions");

      const householdData = await response.json();

      toast.success("Fetched households successfully!")


      const formattedData: any[] = [];
      const dateSet = new Set();
      const categoryTotals: Record<string, number> = {};

      (householdData as any[]).forEach((household) => {
        (household.transactions as any[]).forEach((tx) => {
          const formattedDate = new Date(tx.date).toISOString().split("T")[0];

          formattedData.push({
            date: formattedDate,
            description: tx.description || "No description",
            amount: `$${tx.amount}`,
            category: tx.category,
            account: tx.account,
            status: tx.type === "income" ? "success" : "fail",
          });

          dateSet.add(formattedDate);

          const category = tx.category;
          const amount = parseFloat(tx.amount);

          categoryTotals[category] = (categoryTotals[category] || 0) + amount;
        });
      });

      const dates = Array.from(dateSet);
      const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
        category,
        amount,
      }));

      setTableData(formattedData);
      setDatesData(dates);
      setPieChartData(pieData);


    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      gettingTransaction();
      fetchedRef.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <div className="bg-white shadow-xl p-6 rounded-2xl w-full mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 pb-3">🏠 Household 1</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Expenses */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Total Expenses</p>
              <p className="text-2xl font-semibold text-red-700">$1000</p>
            </div>
            <span className="text-3xl text-red-400">💸</span>
          </div>

          {/* Income */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Income</p>
              <p className="text-2xl font-semibold text-green-700">$1000</p>
            </div>
            <span className="text-3xl text-green-400">💰</span>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <DateSelector data={datesData.length > 0 ? datesData : datesData} onDateSelect={handleDateSelect} />

      {/* Category Cards */}
      <CategoryCards />

      {/* Charts Section */}
      <div className="flex flex-col items-center justify-start lg:flex-row lg:justify-between md:items-start gap-4 w-full">
        <div className="w-full lg:w-1/2">
          <MonthlyBarChart />
        </div>
        <div className="w-full lg:w-1/2">
          <CategoryPieChart data={pieChartData.length > 0 ? pieChartData : []} />
        </div>
      </div>

      {/* Transaction Table */}
      <TransactionTable transactions={tableData} rowsPerPage={10} />

      {/* Add Household */}
      <AddHouseholdDrawer onAdd={AddHousehold} />
    </div>
  );
}
