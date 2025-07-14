"use client"

import React, { useEffect, useState } from 'react'
import HouseholdSummaryList from '@/components/HouseholdSummaryList';
import { toast } from 'react-toastify';
const households = [
    { name: "Household 1", income: 4000, expenses: 2200 },
    { name: "Household 2", income: 3200, expenses: 1800 },
    { name: "Household 3", income: 5000, expenses: 3500 },
    { name: "Household 4", income: 4500, expenses: 2600 },
];
const page = () => {
    const [Households, setHouseholds] = useState<any[]>([])
    const gettingHouseholds = async () => {
        try {
            const storedUser = localStorage.getItem('User');
            const User = storedUser ? JSON.parse(storedUser) : null;
            const response = await fetch(`/api/transaction?userId=${User._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error("Failed to get households of the user");
            }
            const householddata = await response.json();
            console.log(householddata)
            const transformedHouseholds = (householddata as any[]).map(household => {
                let income = 0;
                let expenses = 0;

                for (const txn of household.transactions) {
                    const amount = parseFloat(txn.amount);
                    if (txn.type === 'income') {
                        income += amount;
                    } else if (txn.type === 'expense') {
                        expenses += amount;
                    }
                }

                return {
                    name: household.name,
                    income,
                    expenses
                };
            });
            console.log(transformedHouseholds)
            setHouseholds(transformedHouseholds)

            toast.success("fetched households successfully!");

        } catch (error) {
            toast.error("Error in fetching households");
            console.log("Error in fetching households", error)

        }

    }
    const Addhousehold = () => {
        console.log("Add Household Clicked");

    }

    useEffect(() => {
        gettingHouseholds();
    }, [])
    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 my-6">Households</h1>
            <HouseholdSummaryList households={Households} AddHousehold={() => Addhousehold} />
        </div>
    );

}

export default page
