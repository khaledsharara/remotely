import axios from "axios";
import { ChecklistItem } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createEmployee = async (
  employee: {
    name: string;
    email: string;
    password: string;
    role: string;
  },
  uid: string
) => {
  const employeeData = {
    ...employee,
    managerUid: uid,
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/api/employees/create`,
      employeeData
    );
    const createdEmployee = response.data;
    return createdEmployee;
  } catch (error) {
    console.error("Failed to create employee", error);
  }
};

export const createTask = async (task: {
  title: string;
  description: string;
  dueDate: string;
  uids: string[];
  checklist: ChecklistItem[];
}) => {
  try {
    console.log("Task", task);
    const response = await axios.post(
      `${BASE_URL}/api/managers/add-task`,
      task
    );
    const createdTask = response.data;
    return createdTask;
  } catch (error) {
    console.error("Failed to create employee", error);
  }
};

export const getAllEmployees = async (uid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/managers/employees`, {
      params: {
        managerUid: uid,
      },
    });
    const employees = response.data;
    return employees;
  } catch (error) {
    console.error("Failed to get employees", error);
  }
};

export const getAllEmployeeTasks = async (managerUid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/managers/tasks`, {
      params: {
        managerUid,
      },
    });
    const tasks = response.data;
    return tasks;
  } catch (error) {
    console.error("Failed to get tasks", error);
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
      `${BASE_URL}/api/managers/task/checklist`,
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

export const getEmployee = async (uid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/managers/employee`, {
      params: {
        uid,
      },
    });
    const employee = response?.data?.data;
    console.log("Employee: ", employee);
    return employee;
  } catch (error) {
    console.error("Failed to get employee", error);
  }
};

export const getEmployeeLogs = async (uid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/managers/employee/logs`, {
      params: {
        uid,
      },
    });
    const logs = response.data;
    return logs;
  } catch (error) {
    console.error("Failed to get employee logs", error);
  }
};

export const completeTask = async (taskId: string) => {
  console.log("Verifying task: ", taskId);
  try {
    const response = await axios.put(
      `${BASE_URL}/api/managers/task/complete`,
      {}, // Empty body
      {
        params: { taskId }, // Correctly sends taskId as a query parameter
      }
    );
    const updatedTask = response.data;
    return updatedTask;
  } catch (error) {
    console.error("Failed to complete task", error);
  }
};
