import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployee, getEmployeeLogs } from "../utils/managerApis";
import { Task } from "../utils/types";

interface Employee {
  primaryKey: string;
  name: string;
}

type Log = {
  date: string;
  action: string;
  uid: string;
};

const Logs: React.FC = () => {
  const { id } = useParams();
  const [logs, setLogs] = useState<Log[]>([]);
  const [formattedLogs, setFormattedLogs] = useState<
    {
      date: string;
      time: string;
      action: string;
    }[]
  >([]);
  const [employee, setEmployee] = useState<{
    createdBy: { managerName: string; managerUid: string };
    email: string;
    name: string;
    role: string;
    tasks: {
      [key: string]: Task;
    };
    uid: string;
  }>({
    createdBy: { managerName: "", managerUid: "" },
    email: "",
    name: "",
    role: "",
    tasks: {},
    uid: "",
  });

  useEffect(() => {
    const formattedLogs = logs.map((log) => {
      const [date, time] = log.date.split("T");

      // Convert to AM/PM format
      const timeParts = time.slice(0, 5).split(":");
      let hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const period = hours >= 12 ? "PM" : "AM";

      // Adjust hours for 12-hour format
      hours = hours % 12 || 12; // Convert 0 to 12 for midnight

      return {
        date,
        time: `${hours}:${minutes} ${period}`,
        action: log.action,
      };
    });

    console.log("Formatted logs", formattedLogs);

    setFormattedLogs(formattedLogs);
  }, [logs]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getEmployeeLogs(id || "");
        console.log("Logs", response);
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to get logs", error);
      }
    };

    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(id || "");
        console.log("Employee", response);
        setEmployee(response);
      } catch (error) {
        console.error("Failed to get employee", error);
      }
    };

    fetchLogs();
    fetchEmployee();
  }, [id]);

  return (
    <div className="flex flex-col  w-full">
      <div className="flex flex-row items-center justify-between w-full ">
        <span className="flex text-6xl ml-24">{employee.name}</span>
        <div className="flex ml-auto justify-end items-end">
          <div className="mr-10  flex px-6 py-2 rounded-3xl border-2 border-black overflow-hidden max-w-md font-sans">
            <input
              type="email"
              placeholder="Search Something..."
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg">
        <div className="grid grid-cols-3 w-full mt-5 border-b-[1px] border-black ml-28  py-5">
          <div className="flex justi col-span-1 justify-center text-xl text-slate-700 ">
            Date
          </div>
          <div className="flex col-span-1 justify-center text-xl text-slate-700 ">
            Action
          </div>
          <div className="flex col-span-1 justify-center text-xl text-slate-700 ">
            Time
          </div>
        </div>
        {formattedLogs.map((log, index) => (
          <div key={index} className="flex flex-col w-full ml-28 ">
            <div className="grid grid-cols-3">
              <div className="flex col-span-1 font-sans  justify-center py-5 border-r-[1px] border-black text-lg text-slate-700 bg-gray-300 shadow-xl">
                {log.date}
              </div>
              <div className="flex text-lg col-span-1 justify-center text-slate-700 py-5 px-14 border-r-[1px] border-black font-sans bg-gray-300 shadow-xl">
                {log.action}
              </div>
              <div className="flex text-lg col-span-1 justify-center text-slate-700 py-5 px-20 font-sans bg-gray-300 rounded-tr-lg shadow-xl">
                {log.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
