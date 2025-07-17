"use client";

import { useState } from "react";
import ProfileCard from "./ProfileCard";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [toggleCard, setToggleCard] = useState(false);

    return (
        <>
            <Navbar onAvatarClick={() => setToggleCard((prev) => !prev)} />
            <Sidebar />
            <ProfileCard toggleCard={toggleCard} />
            <main className="p-4 mt-[68px] ml-[64px] md:ml-[240px]">
                {children}
            </main>
        </>
    );
}
