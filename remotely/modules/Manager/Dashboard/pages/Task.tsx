import EmployeeStreamCard from "../components/EmployeeStreamCard";

function Task() {
  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Row for Search Bar and Add Task button */}
      <div className="flex justify-between items-center w-full max-w-xs mb-4 ">
        {/* Search Bar */}
        <div className="relative flex-1 ">
          <div className="flex items-center border border-black rounded-full overflow-hidden ">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-full outline-none text-black bg-inherit placeholder-gray-600"
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
        <button className="ml-4 rounded-lg bg-blue-500 px-4 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add Task
        </button>
      </div>

      {/* EmployeeStreamCard below the search bar and Add Task button */}
      <div className="flex flex-col space-y-4">
        <EmployeeStreamCard />
        <EmployeeStreamCard />
        <EmployeeStreamCard />
        <EmployeeStreamCard />
      </div>
    </div>
  );
}

export default Task;
