import axios from "axios";
import { ChecklistItem } from "../../../Manager/Dashboard/utils/types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllTask = async (employeeUid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/employees/tasks`, {
      params: {
        employeeUid, // Correctly sending as query params
      },
    });

    console.log("Response", response.data.data);

    return response.data.data; // Return the tasks directly
  } catch (error) {
    console.error("Failed to get task", error);
    throw error; // Optional: Re-throw the error for higher-level handling
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/managers/task`, {
      params: {
        taskId,
      },
    });
    const task = response.data.data;
    console.log("TASK: ", task);

    const formattedTask = {
      completed: task.task.completed,
      description: task.task.description,
      dueDate: task.task.dueDate,
      title: task.task.title,
      id: task.task.id,
      employeeName: task.assignedEmployee,
      checklist: task.task.checklist,
    };

    return formattedTask;
  } catch (error) {
    console.error("Failed to get task", error);
  }
};

export const updateChecklist = async (
  taskId: string,
  checklist: ChecklistItem[]
) => {
  try {
    console.log("Checklist", checklist);
    console.log("TaskId", taskId);
    const response = await axios.put(
      `${BASE_URL}/api/employees/task/checklist`,
      {
        taskId,
        updatedChecklist: checklist,
      }
    );
    const updatedChecklist = response.data;
    return updatedChecklist;
  } catch (error) {
    console.error("Failed to update checklist", error);
  }
};
