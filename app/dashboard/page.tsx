"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


// Component Imports

import AddHouseholdDrawer from "@/components/AddHouseholdDrawer";
import CategoryCards from "@/components/CategoryCards";
import CategoryPieChart from "@/components/CategoryPieChart";
import DateSelector from "@/components/DateSelector";
import MonthlyBarChart from "@/components/MonthlyBarChar";
import TransactionTable from "@/components/TransactionTable";
import { ObjectId } from "mongoose";

interface Transaction {
    date: string;
    description: string;
    amount: number;
    category: string;
    account: string;
    type: "income" | "expense";
}

interface Household {
    name?: string;
    transactions?: Transaction[];
    user?: ObjectId;
}




export default function Home() {
    const [tableData, setTableData] = useState<any[]>([]);
    const [datesData, setDatesData] = useState<any[]>([]);

    const [pieChartData, setPieChartData] = useState<any[]>([]);
    const [totalincome, settotalincome] = useState(0)
    const [totalexpense, settotalexpense] = useState(0)
    const [household, sethousehold] = useState<Household>({})

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
        const storedUser = localStorage.getItem("User");
        const User = storedUser ? JSON.parse(storedUser) : null;
        if (!User) {
            toast.warning("please login")
            return;
        }
        const storedHouseHold = localStorage.getItem('household')
        const Household = storedHouseHold ? JSON.parse(storedHouseHold) : null;
        if (!Household) {
            toast.warning("please create household")
            return;
        }

        try {
            const response = await fetch(`/api/transaction/${Household._id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) throw new Error("Failed to get transactions");

            const householdData = await response.json();
            sethousehold(householdData);
            toast.success("Fetched households successfully!")


            const formattedData: any[] = [];
            const dateSet = new Set();
            const categoryTotals: Record<string, number> = {};
            let totalIncome = 0;
            let totalExpense = 0;

            (householdData.transactions as any[]).forEach((tx) => {
                const formattedDate = new Date(tx.date).toISOString().split("T")[0];

                formattedData.push({
                    date: formattedDate,
                    description: tx.description || "No description",
                    amount: `$${tx.amount}`,
                    category: tx.category,
                    account: tx.account,
                    status: tx.type === "income" ? "success" : "fail",
                    type:tx.type
                });

                if (tx.type == "income") {
                    totalIncome = totalIncome + parseFloat(tx.amount)

                } else {
                    totalExpense = totalExpense + parseFloat(tx.amount)
                }

                dateSet.add(formattedDate);

                const category = tx.category;
                const amount = parseFloat(tx.amount);

                categoryTotals[category] = (categoryTotals[category] || 0) + amount;
            });


            const dates = Array.from(dateSet);
            const pieData = Object.entries(categoryTotals).map(([category, amount]) => ({
                category,
                amount,
            }));

            settotalincome(totalIncome)
            settotalexpense(totalExpense)
            setTableData(formattedData);
            setDatesData(dates);
            setPieChartData(pieData);


        } catch (error) {
            toast.error("Error fetching transactions");
            console.error("Error:", error);
        }

    };

    useEffect(() => {
        gettingTransaction();
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
                            <p className="text-2xl font-semibold text-red-700">${totalexpense}</p>
                        </div>
                        <span className="text-3xl text-red-400">💸</span>
                    </div>

                    {/* Income */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-medium">Total Income</p>
                            <p className="text-2xl font-semibold text-green-700">${totalincome}</p>
                        </div>
                        <span className="text-3xl text-green-400">💰</span>
                    </div>
                </div>
            </div>

            {/* Date Selector */}
            <DateSelector data={datesData.length > 0 ? datesData : datesData} onDateSelect={handleDateSelect} />

            {/* Category Cards */}
            <CategoryCards householdData={household} />

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
