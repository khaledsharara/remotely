import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../utils/managerApis";

function Employee() {
  const [numToShow, setNumToShow] = useState(5);
  const navigate = useNavigate();
  const handleCardClick = (primaryKey: string) => {
    navigate(`/dashboard/employees/${primaryKey}`);
  };
  const [employees, setEmployees] = useState<
    { email: string; name: string; role: string; uid: string }[]
  >([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
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

  return (
    <div className="w-full flex p-5">
      <div className="border-black border-[1px] rounded-[30px] w-full px-[2rem] py-[1rem] my-5">
        <div className="flex justify-between w-full border-b-[1px] border-black ">
          <span className=" text-4xl p-5"> Employees</span>

          <button
            className=" h-fit self-center bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={() => navigate("/dashboard/employees/addEmployee")}
          >
            New Employee
          </button>
        </div>

        {employees.slice(0, numToShow).map((employee) => (
          <div
            key={employee.uid}
            className="flex flex-row justify-between py-5 cursor-pointer"
            onClick={() => handleCardClick(employee.uid)}
          >
            <div className="flex flex-row items-center">
              <img className="h-16" />
              <div className="ml-5">
                <span className="text-2xl">{employee.name}</span>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </div>
          </div>
        ))}
        {numToShow < employees.length && (
          <div className="flex justify-center m-5">
            <button
              className="items-center rounded-full px-4 py-2 bg-button outline-none"
              onClick={() => setNumToShow(numToShow + 5)}
            >
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
        )}
      </div>
    </div>
  );
}

export default Employee;
