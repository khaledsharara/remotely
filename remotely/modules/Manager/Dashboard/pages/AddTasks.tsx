import { useState } from "react";
import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const employees = [
  "Employee Name 1",
  "Employee Name 2",
  "Employee Name 3",
  "Employee Name 4",
  "Employee Name 5",
  "Employee Name 6",
  "Employee Name 7",
  "Employee Name 8",
];

function AddTasks() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  const toggleSelection = (name: string) => {
    setSelectedEmployees((prev: string[]) =>
      prev.includes(name)
        ? prev.filter((employee) => employee !== name)
        : [...prev, name]
    );
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        <div className="flex  mt-10 mb-5 justify-between">
          <span className=" text-3xl   w-fit">Tasks</span>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
            Assign
          </button>
        </div>
        <div className="  flex-col w-full h-[20%] rounded-3xl bg-[#D3D2D1] mb-10">
          {" "}
          <div className="flex flex-col justify-between p-5 h-full">
            <div className="flex mb-4 ">
              <input
                type="text"
                placeholder="Title..."
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="mb-4"></div>
            <textarea
              placeholder="Description (optional)..."
              className="w-full bg-transparent border-b-2 pb-2 text-base border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex  flex-row w-full h-1/2 justify-between">
          <div className=" flex flex-col w-[50%] ">
            <div className=" flex text-3xl w-fit mb-5">Assign to</div>
            <div className="flex flex-col h-full rounded-lg bg-[#D3D2D1] mb-5 p-8">
              {employees.map((name, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-4 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(name)}
                    onChange={() => toggleSelection(name)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 overflow-auto focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col  w-1/2 ml-10">
            <div className=" flex text-3xl w-fit mb-5">Due</div>{" "}
            <div className="flex ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker orientation="landscape" />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddTasks;
