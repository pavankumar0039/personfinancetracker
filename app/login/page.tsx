"use client"

import Login from '@/components/Login'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';
type userDataTypes = {
    name?: string; email: string; password: string; type: string
};
const Page = () => {

    const router = useRouter()

    const LoginClicked = async (loginUserDetails: userDataTypes) => {
        const { type, ...userData } = loginUserDetails;
        if (loginUserDetails.type == 'login') {
            try {
                const response = await fetch('/api/auth', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                })
                if (!response.ok) {
                    throw new Error("Failed to add user");
                }
                const userdata = await response.json();
                console.log(userdata)
                toast.success("User added successfully!");
                
                localStorage.setItem('User', JSON.stringify(userdata))
                router.push('/')

            } catch (error) {
                toast.error("Error adding user");
                console.log("error adding user", error)

            }
        }
        else {
            try {
                const response = await fetch('/api/user', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                })
                if (!response.ok) {
                    throw new Error("Failed to add user");
                }
                const userdata = await response.json();
                toast.success("User added successfully!");
                localStorage.setItem('User', JSON.stringify(userdata))
                router.push('/')

            } catch (error) {
                toast.error("Error adding user");
                console.log("error adding user", error)

            }

        }

    }
    return (
        <div>
            <Login onSubmit={(loginUserDetails) => LoginClicked(loginUserDetails)} />
        </div>
    )
}

export default Page
