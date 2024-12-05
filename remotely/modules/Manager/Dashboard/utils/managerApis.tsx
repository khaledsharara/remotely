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

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/employees`);
    const employees = response.data;
    return employees;
  } catch (error) {
    console.error("Failed to get employees", error);
  }
};
