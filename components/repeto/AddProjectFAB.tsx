"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const AddProjectFAB = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/add-project"); // 🚀 No authentication check
  };

  return (
    <div className="fixed bottom-8 right-6 z-40 group">
      <button
        className="
          relative overflow-hidden rounded-full shadow-lg
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          transform transition-all duration-200 ease-in-out
          hover:scale-105 hover:shadow-xl p-4 md:px-6
          border-0 group-hover:ring-4 ring-blue-300 ring-opacity-50
          focus:outline-none focus:ring-4 focus:ring-blue-300
          text-white flex items-center justify-center
          w-14 h-14 md:w-auto md:h-14 md:min-w-0
        "
        onClick={handleClick}
      >
        <div className="flex items-center justify-center space-x-2">
          <Plus className="h-7 w-7 md:mr-2 animate-pulse group-hover:animate-none" />
          <span className="hidden md:inline font-semibold tracking-wide">
            Add Project
          </span>
        </div>
      </button>
    </div>
  );
};

export default AddProjectFAB;
