import { useEffect, useState } from "react";
import EmployeeStreamCard from "../components/EmployeeStreamCard";
import { useNavigate } from "react-router-dom";
import { getAllEmployeeTasks } from "../utils/managerApis";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";
import toast, { Toaster } from "react-hot-toast";

function Tasks() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [searchQuery, setSearchQuery] = useState("");
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
        const response = await getAllEmployeeTasks(user.user || "");
        setTasks(response.data);
        console.log("Tasks", response.data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      }
    };
    fetchTasks();
  }, []);

  const fillerData = [
    {
      primaryKey: "1",
      activityType: "Homework",
      instructorName: "Dr. John Doe",
      headline: "Understanding Algebra",
      subheadline: "Introductory Algebra Homework",
      description:
        "This assignment covers the basics of algebra, including equations and inequalities.",
      dueDate: "2024-10-31T00:00:00Z",
      attachments: [],
    },
    {
      primaryKey: "2",
      activityType: "Quiz",
      instructorName: "Prof. Sarah Lee",
      headline: "Quiz on World History",
      subheadline: "Ancient Civilizations",
      description:
        "A quiz on early civilizations, covering the topics of Mesopotamia, Egypt, and Indus Valley.",
      dueDate: "2024-11-05T00:00:00Z",
      attachments: [],
    },
    {
      primaryKey: "3",
      activityType: "Material",
      instructorName: "Ms. Kate Brown",
      headline: "Physics Lecture Notes",
      subheadline: "Newton's Laws of Motion",
      description:
        "Detailed notes on Newton's three laws of motion with examples and practice problems.",
      dueDate: "",
      attachments: [],
    },
    {
      primaryKey: "4",
      activityType: "Announcement",
      instructorName: "Admin",
      headline: "School Holiday Notice",
      subheadline: "School closed on Nov 25th",
      description:
        "The school will be closed for Thanksgiving on November 25th.",
      dueDate: "",
      attachments: [],
    },
    {
      primaryKey: "5",
      activityType: "Homework",
      instructorName: "Mr. Alex Gray",
      headline: "Literature Analysis",
      subheadline: "Shakespeare's Works",
      description:
        "Read and analyze selected passages from Shakespeare's works for discussion.",
      dueDate: "2024-11-10T00:00:00Z",
      attachments: [],
    },
  ];

  // Filter data based on the search query
  const filteredData = fillerData.filter((data) =>
    `${data.headline} ${data.subheadline} ${data.description} ${data.instructorName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full p-4">
      <Toaster />
      {/* Row for Search Bar and Add Task button */}
      <div className="flex justify-between items-center w-full max-w-xs mb-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="flex items-center border border-black rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full outline-none text-black bg-inherit placeholder-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="text-black px-7 py-2 flex items-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m1.1-5.9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Add Task Button */}
        <button
          className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => navigate("/dashboard/add-tasks")}
        >
          Add Task
        </button>
      </div>

      {/* EmployeeStreamCard below the search bar and Add Task button */}
      <div className="flex flex-col space-y-4 w-full">
        {tasks.map((data) => (
          <EmployeeStreamCard
            key={data.taskId}
            activityType={""}
            primaryKey={data.taskId}
            instructorName={data.employeeName}
            attachments={[]}
            description={data.description}
            dueDate={data.dueDate}
            headline={data.title}
            subheadline={""}
          />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
