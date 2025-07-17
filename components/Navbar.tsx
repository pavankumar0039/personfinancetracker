"use client"

import React from 'react'
import { SiWebmoney } from "react-icons/si";

import { FaCircleUser } from "react-icons/fa6";
const Navbar = ({onAvatarClick}:{onAvatarClick:()=>void}) => {
    return (
        <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center fixed h-[68px] z-50 top-0 left-0">

            <div className="flex items-center gap-2">
                <span className='text-2xl'><SiWebmoney color='violet' /></span>
                <h2 className="text-xl font-semibold text-gray-800">Finance Tracker</h2>
            </div>
            <div className="w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className='cursor-pointer' onClick={onAvatarClick}>
                <FaCircleUser size={30} />
            </div>

        </nav>
    )
}

export default Navbar
