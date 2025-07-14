import React from "react";
import { FaPlus, FaHome, FaMoneyBillWave, FaShoppingCart, FaChartPie, FaUsers } from "react-icons/fa";

type Household = {
    name: string;
    income: number;
    expenses: number;
};

const backgrounds = [
    { gradient: "from-green-300 to-green-500", icon: <FaHome size={22} />, bubble: "bg-green-100" },
    { gradient: "from-blue-300 to-blue-500", icon: <FaMoneyBillWave size={22} />, bubble: "bg-blue-100" },
    { gradient: "from-purple-300 to-purple-500", icon: <FaShoppingCart size={22} />, bubble: "bg-purple-100" },
    { gradient: "from-orange-300 to-orange-500", icon: <FaChartPie size={22} />, bubble: "bg-orange-100" },
    { gradient: "from-pink-300 to-pink-500", icon: <FaUsers size={22} />, bubble: "bg-pink-100" },
];

const HouseholdSummaryList = ({
    households,
    AddHousehold,
}: {
    households: Household[];
    AddHousehold: () => void;
}) => {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {households.map((house, index) => {
                const style = backgrounds[index % backgrounds.length];
                return (
                    <div
                        key={index}
                        className={`relative rounded-xl p-5 text-white shadow-md bg-gradient-to-br ${style.gradient} overflow-hidden`}
                    >
                        {/* Bokeh-like circles */}
                        <div className="absolute w-24 h-24 rounded-full opacity-20 top-0 left-0 blur-2xl scale-110 z-0 pointer-events-none transition-all duration-300 transform rotate-12" style={{ backgroundColor: style.bubble }}></div>
                        <div className="absolute w-24 h-24 rounded-full opacity-20 bottom-0 right-0 blur-2xl scale-110 z-0 pointer-events-none transition-all duration-300 transform -rotate-12" style={{ backgroundColor: style.bubble }}></div>

                        {/* Content */}
                        <div className="relative z-10 space-y-3">
                            <div className="bg-white/30 w-fit p-2 rounded-full">{style.icon}</div>
                            <h2 className="text-lg sm:text-xl font-bold">{house.name}</h2>

                            <div className="flex justify-between text-sm sm:text-base">
                                <span>Total Income</span>
                                <span className="px-2 py-1 text-sm font-medium text-green-800  rounded-md shadow-sm">+ {house.income}$</span>
                            </div>
                            <div className="flex justify-between text-sm sm:text-base">
                                <span>Total Expenses</span>
                                <span className="px-2 py-1 text-sm font-medium text-red-800  rounded-md shadow-sm">- {house.expenses}$</span>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Add Household Button */}
            <div>
                <button
                    className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
                    title="Add Household"
                    onClick={AddHousehold}
                >
                    <FaPlus className="text-xl" />
                </button>
            </div>
        </div>
    );
};

export default HouseholdSummaryList;
