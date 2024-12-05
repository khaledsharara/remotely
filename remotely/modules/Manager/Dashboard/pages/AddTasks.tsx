import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Dayjs } from "dayjs";

import { getAllEmployees } from "../utils/managerApis";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";

function AddTasks() {
  const user = useSelector(selectUser);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [taskData, setTaskData] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);

  const toggleSelection = (uid: string) => {
    setSelectedEmployees((prev: string[]) =>
      prev.includes(uid)
        ? prev.filter((employee) => employee !== uid)
        : [...prev, uid]
    );
  };

  const [employees, setEmployees] = useState<
    { email: string; name: string; role: string; uid: string }[]
  >([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees(user.user || "");
        if (response) {
          setEmployees(response.data);
          console.log("Employees", response.data);
        }
      } catch (error) {
        console.error("Failed to get employees", error);
      }
    };
    fetchEmployees();
  }, []);

  const assignTask = () => {
    console.log("Task Data:", taskData);
    console.log("Selected Employees:", selectedEmployees);
    console.log(
      "Due Date:",
      dueDate ? dueDate.format("YYYY-MM-DD") : "No date selected"
    );
    // Handle task assignment logic here
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        <div className="flex mt-10 mb-5 justify-between">
          <span className="text-3xl w-fit">Tasks</span>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
            onClick={assignTask}
          >
            Assign
          </button>
        </div>
        <div className="flex-col w-full h-[20%] rounded-3xl bg-[#D3D2D1] mb-10">
          <div className="flex flex-col justify-between p-5 h-full">
            <div className="flex mb-4">
              <input
                type="text"
                placeholder="Title..."
                className="w-full bg-transparent border-b-2 pb-2 text-base border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
                onChange={(e) =>
                  setTaskData({ ...taskData, title: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Description (optional)..."
              className="w-full bg-transparent border-b-2 pb-2 text-base border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-row w-full h-1/2 justify-between">
          <div className="flex flex-col w-[50%]">
            <div className="flex text-3xl w-fit mb-5">Assign to</div>
            <div className="flex flex-col h-full rounded-lg bg-[#D3D2D1] mb-5 p-8">
              {employees.map((employee, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-4 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedEmployees.includes(employee.uid)}
                    onChange={() => toggleSelection(employee.uid)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 overflow-auto focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{employee.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-1/2 ml-10">
            <div className="flex text-3xl w-fit mb-5">Due</div>
            <div className="flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation="landscape"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTasks;
