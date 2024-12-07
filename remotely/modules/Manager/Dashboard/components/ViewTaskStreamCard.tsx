import { useParams } from "react-router-dom";

//constant values
function ViewTaskStreamCard({
  completed,
  headline,
  description,
}: {
  completed: boolean;
  headline: string;
  description: string;
}) {
  //constant values
  const activityClass = completed
    ? "bg-gradient-to-r from-card-from to-card-material"
    : "bg-gradient-to-r from-card-from to-card-homework";

  const id = useParams();

  return (
    // Parent container with flex properties to center the content
    <div className="flex flex-col items-center w-full ">
      <div
        key={headline}
        className={`group  rounded-2xl px-8 py-4   h-[200px] w-full   ${activityClass}`}
      >
        <div className="flex flex-row">
          <div className=" ml-4 w-full">
            <div className="text-4xl font-bold flex flex-row justify-between  pb-2">
              <span>{headline}</span>
              <span className="bg-black text-base h-fit opacity-70   text-white rounded-full px-4 items-center font-normal">
                {completed ? "Done" : "To-Do"}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col"></div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2">
                <span className="text-[12px] font-normal line-clamp-3 text-slate-700">
                  {description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTaskStreamCard;
