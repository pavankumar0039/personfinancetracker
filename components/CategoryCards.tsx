"use client";
import { ObjectId } from "mongoose";
import React, { JSX, useEffect, useState } from "react";

import { FaUtensils, FaHome, FaCar, FaPiggyBank, FaShoppingCart, FaHeartbeat, FaBook, FaQuestion } from "react-icons/fa";

const categoryIcons: Record<string, JSX.Element> = {
    Food: <FaUtensils />,
    Rent: <FaHome />,
    Travel: <FaCar />,
    Savings: <FaPiggyBank />,
    Shopping: <FaShoppingCart />,
    Health: <FaHeartbeat />,
    Education: <FaBook />,
    Uncategorized: <FaQuestion />,
};

const categoryColors: Record<string, string> = {
    Food: "bg-green-400",
    Rent: "bg-yellow-400",
    Travel: "bg-blue-400",
    Savings: "bg-purple-400",
    Shopping: "bg-pink-400",
    Health: "bg-red-400",
    Education: "bg-indigo-400",
    Uncategorized: "bg-gray-400",
};

// Construct category data

type Category = {
    name: string;
    count: number;
    income?: string;
    expense?: string;
    icon: JSX.Element;
    bgColor: string;
};

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
interface categoriescardprops {
    householdData: Household
}

const CategoryCards: React.FC<categoriescardprops> = ({ householdData }) => {
    console.log("house", householdData)

    const [categories, setcategories] = useState<Category[]>()

    const changingHouseholdToCategories = () => {
        const categoryMap: Record<string, Category> = {};

        (householdData.transactions as any[]).forEach((tx) => {
            const category = tx.category || "Uncategorized";
            const amount = parseFloat(tx.amount);
            const isIncome = tx.type === "income";

            if (!categoryMap[category]) {
                categoryMap[category] = {
                    name: category,
                    count: 0,
                    income: "0",
                    expense: "0",
                    icon: categoryIcons[category] || <FaQuestion />,
                    bgColor: categoryColors[category] || "bg-gray-400",
                };
            }

            categoryMap[category].count += 1;
            if (isIncome) {
                categoryMap[category].income = (
                    parseFloat(categoryMap[category].income || "0") + amount
                ).toFixed(2);
            } else {
                categoryMap[category].expense = (
                    parseFloat(categoryMap[category].expense || "0") + amount
                ).toFixed(2);
            }
        });

        const categories: Category[] = Object.values(categoryMap);
        setcategories(categories)
    }

    useEffect(() => {

        if (householdData?.transactions && householdData.transactions.length > 0) {
            changingHouseholdToCategories();
        }

    }, [householdData])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4">

            {categories ? (categories?.map((cat, idx) => (
                <div
                    key={idx}
                    className={`relative overflow-hidden rounded-xl text-white p-5 shadow-lg ${cat.bgColor} w-[250px] h-[135px]`}
                >
                    {/* Light circle background like bokeh effect */}
                    <div className="absolute inset-0">
                        <div className="w-20 h-20 bg-white/10 rounded-full absolute top-2 left-2" />
                        <div className="w-20 h-20 bg-white/10 rounded-full absolute bottom-2 right-2" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-1">
                        <div className="bg-white/30 p-2 rounded-full w-fit">{cat.icon}</div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold">{cat.name}</h3>
                                <p className="text-sm">{cat.count} {cat.count === 1 ? "Time" : "Times"}</p>
                            </div>
                            <div>
                                <div className="flex flex-col items-end space-y-1">
                                    <span className="px-2 py-1 text-sm font-medium text-green-800  rounded-md shadow-sm">
                                        + ${cat.income}
                                    </span>
                                    <span className="px-2 py-1 text-sm font-medium text-red-800  rounded-md shadow-sm">
                                        - ${cat.expense}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))) : (<div>No categories found</div>)}
        </div>
    );
};

export default CategoryCards;
