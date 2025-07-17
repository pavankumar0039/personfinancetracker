"use client";

import React, { useMemo, useState } from "react";


type Transaction = {
    date: string;
    description: string;
    amount: string;
    category: string;
    account: string;
    status: string;
    type:string
};

type Props = {
    transactions: Transaction[];
    rowsPerPage?: number;
};

const TransactionTable = ({ transactions, rowsPerPage = 5 }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        status: "All",
        category: "All",
        account: "All",
    });

    const totalPages = Math.ceil(transactions.length / rowsPerPage);

    const filteredTransactions = useMemo(() => {
        return transactions.filter((tx) => {
            return (
                (filters.status === "All" || tx.status === filters.status.toLowerCase()) &&
                (filters.category === "All" || tx.category === filters.category) &&
                (filters.account === "All" || tx.account === filters.account)
            );
        });
    }, [transactions, filters]);

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredTransactions.slice(start, start + rowsPerPage);
    }, [filteredTransactions, currentPage, rowsPerPage]);

    const getUnique = (key: keyof Transaction) =>
        ["All", ...Array.from(new Set(transactions.map((tx) => tx[key])))];

    return (
        <div className="min-h-screen ">
            <div className="bg-white shadow-md rounded-2xl p-4 sm:p-6 max-w-7xl mx-auto">
                {/* Header and Filters */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Transactions</h2>
                    <div className="flex flex-col sm:flex-wrap sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                        {/* Status Filter */}
                        <select
                            className="border border-gray-300 text-sm rounded-md px-3 py-1 text-gray-600"
                            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                            value={filters.status}
                        >
                            <option value="All">Status: All</option>
                            <option value="success">Success</option>
                            <option value="fail">Fail</option>
                        </select>

                        {/* Category Filter */}
                        <select
                            className="border border-gray-300 text-sm rounded-md px-3 py-1 text-gray-600"
                            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
                            value={filters.category}
                        >
                            <option value="All">Category: All</option>
                            {getUnique("category")
                                .filter((c) => c !== "All")
                                .map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                        </select>

                        {/* Account Filter */}
                        <select
                            className="border border-gray-300 text-sm rounded-md px-3 py-1 text-gray-600"
                            onChange={(e) => setFilters((f) => ({ ...f, account: e.target.value }))}
                            value={filters.account}
                        >
                            <option value="All">Account: All</option>
                            {getUnique("account")
                                .filter((a) => a !== "All")
                                .map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th className="py-2 px-2">No</th>
                                <th className="py-2 px-2">Date</th>
                                <th className="py-2 px-2">Description</th>
                                <th className="py-2 px-2">Amount</th>
                                <th className="py-2 px-2">Category</th>
                                <th className="py-2 px-2">Account</th>
                               
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            {paginatedTransactions.map((tx, index) => (
                                <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="py-3 px-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                                    <td className="py-3 px-2">{tx.date}</td>
                                    <td className="py-3 px-2">{tx.description}</td>
                                    {tx.type=="income"?<td className="py-3 px-2 text-green-800">+ {tx.amount}</td>:<td className="py-3 px-2 text-red-800">+ {tx.amount}</td>}
                                    <td className="py-3 px-2">{tx.category}</td>
                                    <td className="py-3 px-2">{tx.account}</td>
                                </tr>
                            ))}
                            {paginatedTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-4 text-center text-gray-400">
                                        No transactions match filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 mt-4 gap-2">
                    <span>
                        Showing {paginatedTransactions.length} of {filteredTransactions.length}
                    </span>
                    <div className="flex flex-wrap gap-1">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-2 cursor-pointer hover:underline"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((page) => {
                                return (
                                    page === 1 ||
                                    page === totalPages ||
                                    (page >= currentPage - 1 && page <= currentPage + 1)
                                );
                            })
                            .reduce((acc: (string | number)[], page, i, arr) => {
                                if (i > 0 && typeof arr[i - 1] === "number" && page - (arr[i - 1] as number) > 1) {
                                    acc.push("...");
                                }
                                acc.push(page);
                                return acc;
                            }, [])
                            .map((pg, i) => (
                                <button
                                    key={i}
                                    onClick={() => typeof pg === "number" && setCurrentPage(pg)}
                                    disabled={pg === "..."}
                                    className={`px-3 py-1 rounded ${pg === currentPage
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-200"
                                        } ${pg === "..." ? "cursor-default text-gray-400" : ""}`}
                                >
                                    {pg}
                                </button>
                            ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-2 cursor-pointer hover:underline"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionTable;
