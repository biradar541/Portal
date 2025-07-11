import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Clear filters when this component mounts
  useEffect(() => {
    dispatch(setSearchedQuery(""));
  }, [dispatch]);

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query.trim()));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div className="text-center px-4 sm:px-6 md:px-8 py-10">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br className="hidden sm:block" /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600">
         Discover thousands of jobs across tech, design, and business roles. Explore top companies, find the right fit, and take your career to the next level.
        </p>

        <div className="flex w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto border border-gray-200 shadow-lg pl-4 pr-1 py-1 rounded-full items-center gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="outline-none border-none w-full text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] h-9 w-9 p-0"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
