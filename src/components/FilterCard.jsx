import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    key: "location",
    filterType: "Location",
    array: [
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Delhi NCR",
      "Chennai",
      "Kolkata",
      "Ahmedabad",
    ],
  },
  {
    key: "industry",
    filterType: "Industry / Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "DevOps Engineer",
      "QA / Test Engineer",
      "Product Manager",
      "UI/UX Designer",
      "Data Analyst",
    ],
  },
  {
    key: "jobType",
    filterType: "Job Type",
    array: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    jobType: "",
  });

  const changeHandler = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const clearCategory = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const clearAll = () => {
    const cleared = {};
    filterData.forEach((f) => (cleared[f.key] = ""));
    setFilters(cleared);
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    const combined = Object.values(filters).filter(Boolean).join(" ");
    dispatch(setSearchedQuery(combined));
  }, [filters]);

  return (
    <div className="w-full bg-white p-4 sm:p-5 rounded-md shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="text-red-500 border-red-300 hover:bg-red-50"
        >
          Clear All
        </Button>
      </div>

      <hr className="mb-4" />

      {filterData.map((data, index) => (
        <details
          key={index}
          className="mb-4 group border border-gray-200 rounded-md"
        >
          <summary className="cursor-pointer font-semibold px-2 py-2 bg-gray-100 flex justify-between items-center">
            <span>{data.filterType}</span>
            <div className="flex items-center gap-2">
              {filters[data.key] && (
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    clearCategory(data.key);
                  }}
                  className="text-xs text-red-500"
                >
                  Clear
                </Button>
              )}
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
            </div>
          </summary>

          <div className="p-3">
            <RadioGroup
              value={filters[data.key]}
              onValueChange={(value) => changeHandler(data.key, value)}
            >
              {data.array.map((item, idx) => {
                const id = `radio-${data.key}-${idx}`;
                return (
                  <div key={id} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem id={id} value={item} />
                    <Label htmlFor={id} className="text-sm">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </details>
      ))}
    </div>
  );
};

export default FilterCard;
