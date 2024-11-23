import Checklist from "../components/Checklist";
import EmployeeLabelCard from "../components/EmployeeLabelCard";
import ViewTaskStreamCard from "../components/ViewTaskStreamCard";

//constant values
function ViewTask() {
  return (
    // Parent container with flex properties to center the content
    <div className="flex flex-col items-center">
      <ViewTaskStreamCard />
      <div className="flex flex-col mt-24 items-start justify-center ml-[15%]">
        <div className="flex mb-6 self-start">
          <span className="text-4xl">Assigned to</span>
        </div>
        <EmployeeLabelCard />
        <div className="flex mt-10 ">
          <Checklist />
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
