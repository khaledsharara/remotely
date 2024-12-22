import { useParams } from "react-router-dom";
import Checklist from "../components/Checklist";
import EmployeeLabelCard from "../components/EmployeeLabelCard";
import ViewTaskStreamCard from "../components/ViewTaskStreamCard";
import { getTaskById, updateChecklist } from "../utils/managerApis";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ChecklistItem } from "../utils/types";

//constant values
function ViewTask() {
  const { id } = useParams();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [task, setTask] = useState<{
    id: string;
    completed: boolean;
    description: string;
    dueDate: string;
    title: string;
    employeeName: string;
  } | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id || "");
        if (response) {
          setTask(response);
          setChecklistItems(response.checklist || []);
          console.log("Task", response);
        } else {
          toast.error("Failed to fetch task");
          setTask(null);
        }
      } catch (error) {
        toast.error("Failed to fetch task");
        console.error("Failed to get task", error);
      }
    };
    fetchTask();
  }, [id]);

  useEffect(() => {
    const updateTaskChecklist = async () => {
      try {
        await updateChecklist(id || "", checklistItems || []);
      } catch (error) {
        toast.error("Failed to update checklist");
        console.error("Failed to update checklist", error);
      }
    };

    if (task) {
      updateTaskChecklist();
    }
  }, [checklistItems]);
  return (
    // Parent container with flex properties to center the content
    <div className="flex flex-col items-center w-full">
      <Toaster />
      <div className="p-5 w-full">
        <ViewTaskStreamCard
          completed={task?.completed || false}
          headline={task?.title || ""}
          description={task?.description || ""}
        />
      </div>
      <div className="flex flex-col mt-14 items-start justify-center w-full p-5">
        <div className="flex mb-6 self-start">
          <span className="text-4xl">Assigned to</span>
        </div>
        <EmployeeLabelCard
          taskId={task?.id || ""}
          employeeName={task?.employeeName || ""}
          completed={task?.completed || false}
        />
        <div className="flex mt-10 w-full">
          <Checklist items={checklistItems} setItems={setChecklistItems} />
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
