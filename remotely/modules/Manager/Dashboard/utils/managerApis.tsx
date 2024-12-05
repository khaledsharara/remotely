import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createEmployee = async (employee: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/employees/create`,
      employee
    );
    const createdEmployee = response.data;
    return createdEmployee;
  } catch (error) {
    console.error("Failed to create employee", error);
  }
};
