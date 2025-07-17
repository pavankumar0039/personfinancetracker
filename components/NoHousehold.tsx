"use client";
import Image from "next/image";
import { FaMoneyBillWave } from "react-icons/fa";

const NoHousehold = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-white text-center">
      <div className="mb-6">
        <Image
       
          src="images/undraw_empty_4zx0.svg" 
          alt="Finance Illustration"
          width={300}
          height={300}
          priority
        />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No Household Found <FaMoneyBillWave className="inline-block ml-1 text-green-500" />
        </h2>
        <p className="text-gray-600 mb-4">
          You haven't created a household yet. Click the <span className="text-blue-600 font-semibold">+ button</span> below
          to start managing your personal finances and track income & expenses easily.
        </p>
      </div>
    </div>
  );
};

export default NoHousehold;
