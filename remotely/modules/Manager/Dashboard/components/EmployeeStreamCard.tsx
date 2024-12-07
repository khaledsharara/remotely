import { useNavigate } from "react-router-dom";

//constant values
function EmployeeStreamCard({
  primaryKey,
  instructorName,
  headline,
  description,
  dueDate,
  completed,
  attachments,
  isEmployee,
}: {
  primaryKey: string;
  instructorName: string;
  headline: string;
  description: string;
  dueDate: string;
  completed: boolean;
  attachments: string[];
  isEmployee?: boolean;
}) {
  //constant values
  const activityClass = completed
    ? "bg-gradient-to-r from-card-from to-card-material"
    : "bg-gradient-to-r from-card-from to-card-homework";
  {
    /*formatting the string date*/
  }
  function formatDueDate(dueDate: string) {
    const date = new Date(Date.parse(dueDate));
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}.${month}`;
  }

  const navigate = useNavigate();

  return (
    <div
      key={primaryKey}
      className={`cursor-pointer group w-full rounded-2xl px-8 py-4 transition-all duration-300 ease-in-out h-[20%] min-h-[125px] max-h-[125px] hover:h-[40%] hover:min-h-[250px] hover:max-h-[250px] overflow-clip overflow-hidden ${activityClass}`}
      onClick={() => {
        !isEmployee
          ? navigate(`/dashboard/view-task/${primaryKey}`)
          : navigate(`/tasks/${primaryKey}`);
      }}
    >
      <div className="flex flex-row">
        <div className="h-20 w-20 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
        </div>
        <div className=" ml-4 w-full">
          <div className=" flex flex-row justify-between border-b-[1px] border-black pb-2">
            <span>{instructorName}</span>
            <span className="bg-black text-base h-fit opacity-50 text-white rounded-full px-4 items-center">
              {completed ? "Done" : "To-Do"}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{headline}</span>
            </div>
            <div className="self-center transition-all duration-300 ease-in-out mr-5">
              ▼
            </div>
          </div>

          <div className="opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-2">
              <span className="text-[12px] font-normal line-clamp-3">
                {description}
              </span>
              <div className="flex flex-col items-end">
                {dueDate && (
                  <span className="text-center text-3xl font-medium">
                    DUE:
                    <br />
                    {formatDueDate(dueDate)}
                  </span>
                )}
              </div>
            </div>
            {attachments && attachments.length > 0 && (
              <div className="mt-4 text-[12px] bg-gray-200 w-fit rounded-full px-5 py-1">
                {attachments.length} attachments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeStreamCard;
