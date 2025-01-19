import Image from "next/image";
import React from "react";

const Whoweare = () => {
  return (
    <div className="bg-[#27272A] w-full h-auto md:p-20 p-14 flex flex-col md:flex-row relative overflow-x-clip gap-8">
      <div className="w-full  md:hidden z-20">
        <Image
          src="./images/AI.jpeg"
          alt="AI representation"
          width={500}
          height={500}
          className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="w-full lg:p-20 md:p-10 text-center text-white z-30">
        <h1 className="md:pb-10 pb-6 text-[35px] md:text-[40px] lg:text-[45px] font-bold text-shadow-xl">
          WHO WE ARE
        </h1>
        <p className="text-left text-[20px] md:text-[24px] text-shadow-xl">
          We are a group of student who are facing the problems as you. We want
          to help othere to find many oporunities that are laying around waiting
          for you.
        </p>
        <ul className="text-left mt-10 list-disc text-[20px] md:text-[22px] text-shadow-xl">
          <li className="pb-4">
            Find internship that work during your college days{" "}
          </li>
          <li className="pb-4">
            Find scholarship that you are elgible for during your years in
            college
          </li>
          <li>Find online hackathons and open source projects </li>
        </ul>
        <button>
          <div className="w-[137px] h-[45px] bg-[#ffffff] mt-10 rounded-2xl text-black font-davidLibre flex justify-center items-center text-[18.5px] hover:text-white font-medium hover:bg-black drop-shadow-lg">
            About us
          </div>
        </button>
      </div>
      <div className="z-20 hidden lg:block md:hidden">
        <Image
          src="./images/AI.jpeg"
          alt="AI representation"
          width={500}
          height={500}
          className="rounded-3xl hover:scale-105 transition-all duration-300 ease-in-out"
        />
      </div>
      <div className="md:w-[260px] md:h-[260px] w-[150.12px] h-[150.12px] bg-gradient-to-t to-[#2CB1CF] from-[#1D7589] z-20 absolute md:top-[111.85px] bottom-[250px] md:left-[120px] right-[170px] transform rounded-xl"></div>
      <div className="md:w-[135px] md:h-[135px] w-[70.12px] h-[70.12px] bg-gradient-to-t to-[#2CB1CF] from-[#1D7589] absolute md:top-[351.85px] bottom-[390px] md:left-[360px] z-10 left-[100px] transform rounded-xl"></div>
      <div className="lg:block hidden md:w-[260px] md:h-[260px] bg-gradient-to-t to-[#2CB1CF] from-[#1D7589] shadow-2xl shadow-black z-20 absolute md:top-[761.85px] bottom-[100px] md:left-[910px] left-[120px] transform rounded-xl"></div>
      <div className="lg:block hidden md:w-[135px] md:h-[135px] bg-gradient-to-t to-[#2CB1CF] from-[#1D7589] shadow-2xl shadow-black absolute md:top-[651.85px] bottom-[100px] md:left-[800px] z-10 left-[120px] transform rounded-xl"></div>
    </div>
  );
};

export default Whoweare;
