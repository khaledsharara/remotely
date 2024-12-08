import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployee } from "../utils/managerApis";
import { ChecklistItem, Task } from "../utils/types";
import toast, { Toaster } from "react-hot-toast";

const employees = [
  { primaryKey: "1", name: "Ada Lovelace" },
  { primaryKey: "2", name: "Alan Turing" },
  { primaryKey: "3", name: "Grace Hopper" },
  // Add more filler employees as needed
];

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const employee = employees[0];
  const [tasks, setTasks] = useState<Task[]>([]);

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
    const fetchEmployee = async () => {
      {
        try {
          const response = await getEmployee(id || "");
          setEmployee(response);
          setTasks(Object.values(response.tasks));
        } catch (error) {
          console.error("Failed to get employee", error);
          toast.error("Failed to get employee");
        }
      }
    };

    fetchEmployee();
  }, [id]);

  const handleCardClick = (primaryKey: string) => {
    navigate(`/dashboard/employees/logs/${primaryKey}`);
  };

  return (
    <div className="flex flex-col w-full">
      <Toaster />
      <div className="p-5">
        {/* Big Name section */}
        <div className="flex flex-row justify-between border-black border-[1px] rounded-[30px] w-full px-[2rem] py-[1rem]">
          <div>
            <div className="text-title font-medium">{employee.name}</div>
            <div className="border-[1px] border-black w-fit rounded-full px-4 mt-2">
              Front-end
            </div>
            <div className="flex border-[1px] border-black w-fit rounded-full px-4 mt-2 ">
              <button onClick={() => handleCardClick(employee.uid)}>
                Check logs
              </button>
            </div>
          </div>
          <img
            alt="Profile pic"
            src="/profile.svg"
            className="h-32 justify-self-center"
          />
        </div>
        {/* Submissions section */}
      </div>

      <div className="flex-col border-black border-[1px] rounded-[30px] mt-10 w-[97%] ml-5">
        <div className="flex flex-row ml-5 p-6 items-center justify-between">
          <span className="text-xl">All</span>
          <div className="ml-auto px-4 py-2 bg-gray-400 rounded-[30px] space-x-8">
            <span className="text-gray-800">Filter by</span>
            <span>↓</span>
          </div>
        </div>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between p-2 border-t-[1px] border-black w-[96%] mt-5 ml-8 mb-5"
          >
            <div className="flex-col w-full">
              <div className="flex flex-row items-center mb-2">
                <span className="text-2xl font-extralight">{task.title}</span>
                <div className="flex ml-auto">
                  <span className="text-blue-600">
                    {task.completed ? "Done" : "To-Do"}
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-lg font-thin text-blue-600">
                  {task.dueDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeProfile;
