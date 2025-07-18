

"use client"

import React, { useEffect, useState } from 'react'
import HouseholdSummaryList from '@/components/HouseholdSummaryList';
import { toast } from 'react-toastify';
import { ObjectId } from 'mongoose';
import { useRouter } from 'next/navigation';
import NoHousehold from '@/components/NoHousehold';
import AddHouseholdDrawer from '@/components/AddHouseholdDrawer';


const Page = () => {
  const [Households, setHouseholds] = useState<any[]>([])
  const router = useRouter()
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
      const householddata: any[] = await response.json();
      console.log(householddata)
      const transformedHouseholds = (householddata).map(household => {
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
          _id: household._id,
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
  const AddHousehold = async (HouseholdName: string) => {
    const storedUser = localStorage.getItem("User");
    const User = storedUser ? JSON.parse(storedUser) : null;

    if (User?._id) {
      try {
        const response = await fetch("/api/transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: HouseholdName, user: User._id }),
        });

        if (!response.ok) throw new Error("Failed to add household");

        const data = await response.json();
        toast.success("Household added successfully!");
        localStorage.setItem("household", JSON.stringify(data));
      } catch (error) {
        toast.error("Error adding household");
        console.error("Error:", error);
      }
    }
  };
  const householdClicked = async (id: ObjectId) => {
    console.log(id)
    try {
      const response = await fetch(`/api/transaction/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to get transactions");

      const householdData = await response.json();
      localStorage.setItem('household', JSON.stringify(householdData))
      router.push('/dashboard')
      toast.success("Fetched households successfully!")
    } catch (error) {
      toast.error("Error fetching transactions");
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    gettingHouseholds();
  }, [])
  return (<>
    {Households.length > 0 ?
      (<div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold text-gray-800 my-6">Households</h1>
        <HouseholdSummaryList householdClicked={(id) => householdClicked(id)} households={Households} />
      </div>) : (<NoHousehold />)}
    <AddHouseholdDrawer onAdd={AddHousehold} />
  </>
  );

}

export default Page
