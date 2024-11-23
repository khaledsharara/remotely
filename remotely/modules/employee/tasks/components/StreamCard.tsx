import { FaChevronDown } from "react-icons/fa6";
import profile from "/profile.svg";

function StreamCard({
  primaryKey,
  activityType,
  instructorName,
  headline,
  subheadline,
  description,
  dueDate,
}: {
  primaryKey: string;
  activityType: string;
  instructorName: string;
  headline: string;
  subheadline: string;
  description: string;
  dueDate: string;
  attachments?: { id: number; name: string }[];
  editable: boolean;
}) {
  const activityClass =
    {
      done: "bg-gradient-to-r from-card-from to-card-homework",
      todo: "bg-gradient-to-r from-card-from to-card-quiz",
    }[activityType?.toLowerCase()] || "";

  const formatDueDate = (dueDate: string) => {
    const date = new Date(Date.parse(dueDate));
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}.${month}`;
  };

  return (
    <div
      key={primaryKey}
      className={`cursor-pointer group w-full rounded-2xl px-8 py-4 transition-all duration-300 ease-in-out h-[20%] min-h-[125px] max-h-[125px] hover:h-[40%] hover:min-h-[250px] hover:max-h-[250px] overflow-clip ${activityClass}`}
    >
      <div className="flex flex-row">
        <img src={profile} alt="profile" className="h-20" />
        <div className="ml-4 w-full">
          <div className="flex flex-row justify-between border-b-[1px] border-black pb-2">
            <span>{instructorName}</span>
            <div className="flex flex-row">
              <span className="bg-black text-base h-fit opacity-50 text-white rounded-full px-4 items-center">
                {activityType}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{headline}</span>
              <span className="text-sm font-normal">{subheadline}</span>
            </div>
            <div className="self-center group-hover:rotate-180 transition-all duration-300 ease-in-out mr-5">
              <FaChevronDown />
            </div>
          </div>
          <div className="opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-2">
              <span className="text-[12px] font-normal line-clamp-3">
                {description}
              </span>
              <div className="flex flex-col items-end">
                {dueDate ? (
                  <span className="text-center text-3xl font-medium">
                    DUE:
                    <br />
                    {formatDueDate(dueDate)}
                  </span>
                ) : (
                  <span className="text-center text-3xl font-medium"></span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamCard;
