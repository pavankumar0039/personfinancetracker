"use client";

import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import Image from "next/image";
import { useState } from "react";

type ProfileCardProps = {
    toggleCard: boolean;
};

export default function ProfileCard({ toggleCard }: ProfileCardProps) {
    const [profileImage, setProfileImage] = useState("/images/27b9464ddd198da1f76bdbd45d4d5078.jpg");

    return (
        <div
            className={`fixed top-18 right-4 z-50 transition-transform duration-300 ease-in-out ${toggleCard ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                } bg-white shadow-lg rounded-2xl w-70 p-6`}
        >
            <h2 className="text-gray-500 text-sm font-medium mb-4">user profile</h2>

            <div className="flex flex-col items-center">
                <div className="w-full flex items-center gap-4">
                    {profileImage ? (

                        <Image
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full"
                            width={60}
                            height={60}
                        />

                    ) : (
                        <div></div>

                    )}

                    <h3 className="text-md font-semibold mt-3">Adam Suley</h3>
                </div>

                <div className="mt-4 w-full text-[12px] font-medium text-gray-600">
                    <div className="flex items-center mb-2">
                        <FaEnvelope className="mr-2" />
                        <span>adamsul@email.com</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaPhone className="mr-2" />
                        <span>+01 234 567 000</span>
                    </div>
                    <div className="flex items-center leading-tight">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>
                            Main Street, North Park 123,<br />12F Orchid Building.
                        </span>
                    </div>
                </div>
                <div className="w-full cursor-pointer">
                    <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold ">
                        Edit
                    </button>
                </div>


            </div>
        </div>
    );
}
