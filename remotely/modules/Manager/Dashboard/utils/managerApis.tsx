import axios from "axios";

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
