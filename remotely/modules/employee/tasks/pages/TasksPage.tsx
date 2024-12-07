import { useEffect, useState } from "react";
import "../styles/MyGroupsPage.css";
import EmployeeStreamCard from "../../../Manager/Dashboard/components/EmployeeStreamCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";
import { getAllTask } from "../utils/tasksApis";
import { Toaster } from "react-hot-toast";

export default function TasksPage() {
  const searchQuery = "";
  const user = useSelector(selectUser);
  const [tasks, setTasks] = useState<
    {
      taskId: string;
      completed: boolean;
      description: string;
      dueDate: string;
      title: string;
      employeeName: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTask(user.user || "");
        setTasks(response);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="MyGroupsRoot h-auto">
      <Toaster />
      <div className="flex flex-col w-full h-auto flex-grow mx-10 border-black border-[1px] rounded-[30px] p-4">
        {/* Title */}
        <div className="text-xl font-bold text-black my-8 ml-2">
          Assignment Stream
        </div>
        {/* Toolbar */}
        <div className="flex flex-row justify-between w-full">
          {/* Searchbar */}
          <div className="relative text-gray-600 w-1/2 h-full">
            <input
              type="search"
              name="search"
              placeholder="Search..."
              className="w-full bg-transparent px-5 h-full pr-10 rounded-full text-sm border-2 border-solid border-black focus:border-black focus:ring-0 focus:outline-none"
              value={searchQuery}
            />
          </div>
          {/* Filter */}
          <div className="group inline-block w-1/4 relative">
            <button className="items-center w-full rounded-full px-4 py-2 bg-button outline-none">
              <div className="flex flex-row justify-between">
                <span className="pr-1 text-sm">Filter By</span>
                <span className="self-end">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
        {/* Stream */}
        <div className="mt-5">
          {tasks.map((data) => (
            <div className="my-3" key={data.taskId}>
              <EmployeeStreamCard
                key={data.taskId}
                primaryKey={data.taskId}
                instructorName={data.employeeName}
                attachments={[]}
                description={data.description}
                dueDate={data.dueDate}
                headline={data.title}
                completed={data.completed}
                isEmployee={true}
              />
            </div>
          ))}
          <div className="flex justify-center m-5">
            <button className="items-center rounded-full px-4 py-2 bg-button outline-none">
              <div className="flex flex-row justify-between gap-6">
                <span className="pr-1 text-sm text-black">View More</span>
                <span className="self-end">
                  <svg
                    className="fill-black h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
