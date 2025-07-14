"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const AddHouseholdDrawer = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle drawer
  const toggleDrawer = () => setIsVisible((prev) => !prev);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
        setHouseholdName("");
      }
    };
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible]);

  const handleSubmit = () => {
    
    if(localStorage.getItem('User')==null){
      toast.error("Please login first")
      return;
    }
    if(householdName.trim()) {

      onAdd(householdName.trim());
      setIsVisible(false);
      setHouseholdName("");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50 cursor-pon"
        title="Add Household"
        onClick={toggleDrawer}
      >
        <FaPlus className="text-xl" />
      </button>

      {/* Drawer with smooth appearance */}
      <div className="fixed bottom-24 right-6 z-50">
        <div
          ref={containerRef}
          className={`bg-white p-6 rounded-xl shadow-lg w-[90vw] max-w-sm transform transition-all duration-300 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Add Household
          </h2>
          <input
            type="text"
            placeholder="Enter household name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={householdName}
            onChange={(e) => setHouseholdName(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer "
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default AddHouseholdDrawer;
