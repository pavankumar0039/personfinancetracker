"use client";

import React, { useState } from "react";
import { FaMoneyBill, FaTags, FaAlignLeft, FaWallet, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";


const AddTransactionForm = () => {
   
   
    const [form, setForm] = useState({
        account: "",
        category: "",
        description: "",
        type: "expense",
        amount: "",
        date: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Transaction Data:", form);

        const household = localStorage.getItem("household");
        console.log("Household Data:", household);
        if (!household) {
            toast.error("No household found. Please create a household first.");
            return;
        }
        console.log("Household Data:", household);
        const householdData = JSON.parse(household);
        const householdId = householdData._id;

        const userData = { ...form, household: householdId };

        try {

            const response = await fetch(`/api/transaction/${householdId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Failed to add transaction");
            }

            // const data = await response.json();
            toast.success("Transaction added successfully!");
            setForm({
                account: "",
                category: "",
                description: "",
                type: "expense",
                amount: "",
                date: "",
            });

        } catch (error) {
            console.error("Error adding transaction:", error);
            toast.error("Failed to add transaction. Please try again.");
        }
    };


    return (
        <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Account</label>
                        <div className="relative">
                            <FaWallet className="absolute top-3.5 left-3 text-gray-400" />
                            <select
                                name="account"
                                value={form.account}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            >
                                <option value="">Select Account</option>
                                <option value="Cash">Cash</option>
                                <option value="Savings">Savings</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Category</label>
                        <div className="relative">
                            <FaTags className="absolute top-3.5 left-3 text-gray-400" />
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            >
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Bills">Bills</option>
                                <option value="Travel">Travel</option>
                                <option value="Health">Health</option>
                                <option value="Salary">Salary</option>
                                <option value="Shopping">Shopping</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Row 2: Description */}
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                    <div className="relative">
                        <FaAlignLeft className="absolute top-3.5 left-3 text-gray-400" />
                        <input
                            type="text"
                            name="description"
                            placeholder="e.g., Dinner at KFC"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                        />
                    </div>
                </div>

                {/* Row 3: Type (Radio) */}
                <div className="flex gap-6 items-center">
                    <span className="text-sm font-medium text-gray-700">Type:</span>
                    <label className="flex items-center gap-2 text-gray-700 text-sm">
                        <input
                            type="radio"
                            name="type"
                            value="income"
                            checked={form.type === "income"}
                            onChange={handleChange}
                            className="accent-green-500"
                        />
                        Income
                    </label>
                    <label className="flex items-center gap-2 text-gray-700 text-sm">
                        <input
                            type="radio"
                            name="type"
                            value="expense"
                            checked={form.type === "expense"}
                            onChange={handleChange}
                            className="accent-red-500"
                        />
                        Expense
                    </label>
                </div>

                {/* Row 4: Amount & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Amount</label>
                        <div className="relative">
                            <FaMoneyBill className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="number"
                                name="amount"
                                value={form.amount}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Date</label>
                        <div className="relative">
                            <FaCalendarAlt className="absolute top-3.5 left-3 text-gray-400" />
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition font-medium"
                    >
                        Add Transaction
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTransactionForm;
