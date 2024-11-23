import { useNavigate } from "react-router-dom";

const employees = [
  { primaryKey: "1", name: "Ada Lovelace" },
  { primaryKey: "2", name: "Alan Turing" },
  { primaryKey: "3", name: "Grace Hopper" },
  // Add more filler employees as needed
];

function EmployeeProfile() {
  // Using a placeholder employee for demonstration
  const navigate = useNavigate();
  const handleCardClick = (primaryKey: string) => {
    navigate(`/dashboard/employees/logs/${primaryKey}`);
  };
  const employee = employees[0];

  // Array of tasks (could be static or dynamic)
  const tasks = Array(4).fill({
    title: "Task",
    status: "Done",
    dueDate: "Due 29.07, 11.59pm",
    verificationStatus: "Unverified",
  });

  return (
    <div className="flex flex-col w-full">
      <div className="p-5">
        {/* Big Name section */}
        <div className="flex flex-row justify-between border-black border-[1px] rounded-[30px] w-full px-[2rem] py-[1rem]">
          <div>
            <div className="text-title font-medium">{employee.name}</div>
            <div className="border-[1px] border-black w-fit rounded-full px-4 mt-2">
              Front-end
            </div>
            <div className="flex border-[1px] border-black w-fit rounded-full px-4 mt-2 ">
              <button onClick={() => handleCardClick(employee.primaryKey)}>
                {" "}
                Check logs
              </button>
            </div>
          </div>
          <img alt="Profile pic" className="h-32 justify-self-center" />
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
                  <span className="text-blue-600">{task.status}</span>
                </div>
              </div>
              <div className="flex flex-row items-center">
                <span className="text-lg font-thin text-blue-600">
                  {task.dueDate}
                </span>
                <div className="flex ml-auto">
                  <span className="text-xl">{task.verificationStatus}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeProfile;
