"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    id: 1,
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Suspendisse Varius Enim In Eros Elementum Tristique. Duis Cursus, Mi Quis Viverra Ornare.",
    name: "Sooraj Krishna K P",
    course: "S6 Computer Science, 2024",
  },
  {
    id: 2,
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Suspendisse Varius Enim In Eros Elementum Tristique. Duis Cursus, Mi Quis Viverra Ornare.",
    name: "Deepthi T",
    course: "S6 Civil Engineering, 2024",
  },
  {
    id: 3,
    text: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Suspendisse Varius Enim In Eros Elementum Tristique. Duis Cursus, Mi Quis Viverra Ornare.",
    name: "Yash",
    course: "S2 Mechanical Engineering, 2024",
  },
];

const StudentReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative bg-[#27272A] w-full py-8 md:py-8 overflow-x-clip h-[600px]">
      {/* Rest of the component remains the same */}
      <div className="absolute w-64 h-64 p-4 rounded-xl shadow-sm">
        <div className="absolute top-24 md:left-24 left-8 w-60 h-60 bg-gradient-to-br from-[#1D7589] to-[#2CB1CF] transform rotate-3 shadow-lg shadow-black z-10 transition-all duration-300 rounded-xl" />
        <div className="absolute top-48 md:left-48 left-32 w-60 h-60 bg-gradient-to-br from-[#196A79] to-[#28A2BF] transform -rotate-3 shadow-lg shadow-black z-10 transition-all duration-300 rounded-xl" />
        <div className="absolute top-72 md:left-72 left-56 w-60 h-60 bg-gradient-to-br from-[#145C6A] to-[#2593AE] transform rotate-6 shadow-md shadow-black z-10 transition-all duration-300 rounded-xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-white text-[30px] md:text-[40px] lg:text-[45px]l font-bold mb-8 md:mb-12 pb-12 text-center">
          WHAT STUDENTS HAVE TO SAY ABOUT US
        </h2>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white/70 p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </button>

          <div className="flex justify-center items-center gap-4 md:gap-8 overflow-hidden text-shadow-xl px-24">
            {[-1, 0, 1].map((offset) => {
              const index =
                (currentIndex + offset + reviews.length) % reviews.length;
              const review = reviews[index];
              const isActive = offset === 0;
              return (
                <div
                  key={review.id}
                  className={`bg-transparent border-2 border-gray-200 p-6 md:p-8 rounded-lg transition-all duration-0 lg:w-full ${
                    isActive ? "opacity-100" : "opacity-50"
                  } ${
                    Math.abs(offset) === 1
                      ? "hidden lg:block"
                      : "block text-center"
                  }`}
                >
                  <p className="text-white mb-4 md:mb-6 text-[18px] leading-relaxed">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div>
                      <h3 className="text-white font-medium text-[16px] md:text-[17px]">
                        {review.name}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm">
                        {review.course}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white/70 p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6 md:mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentReviews;
