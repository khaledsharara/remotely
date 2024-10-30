import { useState } from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="min-h-full">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="-mt-20 px-4 pt-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="black"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div className="flex h-full w-full">
        <div
          className={`
              flex flex-col items-start border-r-[1px] border-black h-full text-black
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
        >
          <ul className="w-full">
            <li className="w-full">
              <NavLink
                to="tasks"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-r-2 border-primary w-full block p-2"
                    : "cursor-pointer block p-2"
                }
              >
                Tasks
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="teachers"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-r-2 border-primary w-full block p-2"
                    : "cursor-pointer block p-2"
                }
              >
                Employees
              </NavLink>
            </li>
            <li className="w-full">
              <NavLink
                to="grades"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary border-r-2 border-primary w-full block p-2"
                    : "cursor-pointer block p-2"
                }
              >
                Analytics
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
