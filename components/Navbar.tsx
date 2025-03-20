"use client";
// import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false);

  // const toggleDropdown = () => {
  //   setDropdownOpen((prevState) => !prevState);
  // };

  // const toggleMenu = () => {
  //   setMenuOpen((prevState) => !prevState);
  // };

  return (
    <nav className="bg-white relative z-50 border-b-2 border-black px-4">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto py-5">
        {/* Logo Section */}
        <div className="flex flex-row font-poppins font-bold text-[26px] z-10 items-center relative text-black">
          GecianArchive
        </div>




        {/* Repeto Button */}
        <button>
          <Link href="/repeto">
            <div className="w-[117px] h-[45px] bg-[#000000] rounded-3xl text-white font-davidLibre flex justify-center items-center text-[15.5px] hover:bg-white drop-shadow-lg hover:text-black">
              Login
            </div>
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
