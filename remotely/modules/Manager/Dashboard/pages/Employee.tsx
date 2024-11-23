import { useState } from "react";

import { useNavigate } from "react-router-dom";

const employees = [
  { primaryKey: "1", name: "Ada Lovelace" },
  { primaryKey: "2", name: "Alan Turing" },
  { primaryKey: "3", name: "Grace Hopper" },
  { primaryKey: "4", name: "Tim Berners-Lee" },
  { primaryKey: "5", name: "Linus Torvalds" },
  { primaryKey: "6", name: "Marie Curie" },
  { primaryKey: "7", name: "Albert Einstein" },
  { primaryKey: "8", name: "Stephen Hawking" },
  { primaryKey: "9", name: "Carl Sagan" },
  { primaryKey: "10", name: "Katherine Johnson" },
];

function Employee() {
  const [numToShow, setNumToShow] = useState(5);
  const navigate = useNavigate();
  const handleCardClick = (primaryKey: string) => {
    navigate(`/dashboard/employees/${primaryKey}`);
  };

  return (
    <div className="w-full flex p-5">
      <div className="border-black border-[1px] rounded-[30px] w-full px-[2rem] py-[1rem] my-5">
        <div className="text-4xl p-5 w-full border-b-[1px] border-black">
          Employees
        </div>
        {employees.slice(0, numToShow).map((employee) => (
          <div
            key={employee.primaryKey}
            className="flex flex-row justify-between py-5 cursor-pointer"
            onClick={() => handleCardClick(employee.primaryKey)}
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
