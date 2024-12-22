import axios from "axios";

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
