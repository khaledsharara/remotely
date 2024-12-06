import { FaFilePdf } from "react-icons/fa6";
import { useParams } from "react-router-dom";

//constant values
function ViewTaskStreamCard({
  primaryKey = "1",
  activityType = "Homework",
  headline = "Headline",
  subheadline = "Sample Subheadline",
  description = "This is a sample description of the activity. It provides an overview of the task details.",
  pdf = "Attachment_Title.pdf",
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

  const id = useParams();

  return (
    // Parent container with flex properties to center the content
    <div className="flex flex-col items-center w-full ">
      <div
        key={primaryKey}
        className={`group  rounded-2xl px-8 py-4   h-[250px] w-full   ${activityClass}`}
      >
        <div className="flex flex-row">
          <div className=" ml-4 w-full">
            <div className="text-4xl font-bold flex flex-row justify-between  pb-2">
              <span>{headline}</span>
              <span className="bg-black text-base h-fit opacity-70   text-white rounded-full px-4 items-center font-normal">
                {activityType}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-normal">{subheadline}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-2">
                <span className="text-[12px] font-normal line-clamp-3 text-slate-700">
                  {description}
                </span>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex mt-20 bg-slate-200   w-[15%] rounded-lg h-7 justify-center items-center space-x-2">
                <div className="flex text-red-600">
                  <FaFilePdf />
                </div>
                <span className="text-[11px] text-slate-800">{pdf}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewTaskStreamCard;
