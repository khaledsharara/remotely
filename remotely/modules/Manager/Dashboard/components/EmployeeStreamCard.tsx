import { useNavigate } from "react-router-dom";

//constant values
function EmployeeStreamCard({
  primaryKey = "1",
  activityType = "Homework",
  instructorName = "Instructor Name",
  headline = "Sample Headline",
  subheadline = "Sample Subheadline",
  description = "This is a sample description of the activity. It provides an overview of the task details.",
  dueDate = "2024-10-31T00:00:00Z",
  attachments = [],
}) {
  //constant values
  const activityClass =
    {
      homework: "bg-gradient-to-r from-card-from to-card-homework",
      quiz: "bg-gradient-to-r from-card-from to-card-quiz",
      material: "bg-gradient-to-r from-card-from to-card-material",
      announcement: "bg-gradient-to-r from-card-from to-card-announcement",
    }[activityType.toLowerCase()] || "";
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
        navigate(`/dashboard/view-task/${primaryKey}`);
      }}
    >
      <div className="flex flex-row">
        <div className="h-20 w-20 bg-gray-300 rounded-full" />
        <div className=" ml-4 w-full">
          <div className=" flex flex-row justify-between border-b-[1px] border-black pb-2">
            <span>{instructorName}</span>
            <span className="bg-black text-base h-fit opacity-50 text-white rounded-full px-4 items-center">
              {activityType}
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{headline}</span>
              <span className="text-sm font-normal">{subheadline}</span>
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
