"use client";
import { JSX } from "react";
import { FaUtensils, FaFileInvoiceDollar, FaPlane, FaHeartbeat, FaMoneyBillWave, FaShoppingBag } from "react-icons/fa";

type Category = {
    name: string;
    count: number;
    icon: JSX.Element;
    bgColor: string;
};

const categories: Category[] = [
    { name: "Food", count: 12, icon: <FaUtensils />, bgColor: "bg-green-400" },
    { name: "Bills", count: 5, icon: <FaFileInvoiceDollar />, bgColor: "bg-red-400" },
    { name: "Travel", count: 7, icon: <FaPlane />, bgColor: "bg-blue-400" },
    { name: "Health", count: 4, icon: <FaHeartbeat />, bgColor: "bg-pink-400" },
    { name: "Salary", count: 2, icon: <FaMoneyBillWave />, bgColor: "bg-yellow-400" },
    { name: "Shopping", count: 10, icon: <FaShoppingBag />, bgColor: "bg-purple-400" },
];

const CategoryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
            {categories.map((cat, idx) => (
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
                                        + $100
                                    </span>
                                    <span className="px-2 py-1 text-sm font-medium text-red-800  rounded-md shadow-sm">
                                        - $500
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryCards;
