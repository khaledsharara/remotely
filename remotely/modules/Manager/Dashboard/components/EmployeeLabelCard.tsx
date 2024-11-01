//constant values
function EmployeeLabelCard({
  primaryKey = "1",
  activityType = "Missing",
  employeeName = "Employee Name",
  description = "This is a sample description of the activity. It provides an overview of the task details.",

  attachments = [],
}) {
  //constant values

  return (
    <div
      key={primaryKey}
      className="w-full rounded-2xl px-8 py-4   bg-slate-400 h-24"
    >
      <div className="flex flex-row">
        <div className="h-16 w-16 bg-gray-300 rounded-full" />
        <div className=" ml-4 w-full">
          <div className=" flex flex-row justify-between text-lg font-bold pb-2">
            <span>{employeeName}</span>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none "
            >
              Verify
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="bg-red-600 text-sm h-fit  text-white rounded-full px-4 items-center">
                {activityType}
              </span>
            </div>
          </div>

          <div className="opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-2">
              <span className="text-[12px] font-normal line-clamp-3">
                {description}
              </span>
              <div className="flex flex-col items-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLabelCard;
