import toast from "react-hot-toast";
import { completeTask } from "../utils/managerApis";

//constant values
function EmployeeLabelCard({
  completed,
  employeeName,
  taskId,
}: {
  completed: boolean;
  employeeName: string;
  taskId: string;
}) {
  const verifyTask = async () => {
    try {
      // Wrapping the completeTask call inside the toast.promise
      await toast.promise(completeTask(taskId), {
        loading: "Verifying task...",
        success: "Task verified successfully",
        error: "Failed to verify task",
      });

      // Reload the page after success
      window.location.reload();
    } catch (error) {
      toast.error("Failed to verify task");
    }
  };

  return (
    <div className="w-full rounded-2xl px-8 py-4   bg-slate-400 h-24">
      <div className="flex flex-row">
        <div className="h-16 w-16 rounded-full">
          <img src="/profile.svg" className="w-full h-full" />
        </div>

        <div className=" ml-4 w-full">
          <div className=" flex flex-row justify-between text-lg font-bold pb-2">
            <span>{employeeName}</span>
            <button
              type="button"
              className={`text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2 focus:outline-none ${
                completed ? "bg-blue-400" : "hover:bg-blue-800 bg-blue-700 "
              } `}
              disabled={completed}
              onClick={verifyTask}
            >
              Verify
            </button>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              {/* <span className="bg-red-600 text-sm h-fit  text-white rounded-full px-4 items-center">
                {activityType}
              </span> */}
            </div>
          </div>

          <div className="opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-300 ease-in-out mt-4">
            <div className="grid grid-cols-2">
              <div className="flex flex-col items-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLabelCard;
