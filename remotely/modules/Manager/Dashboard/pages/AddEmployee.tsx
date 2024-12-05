import { useState } from "react";
import { createEmployee } from "../utils/managerApis";
import toast, { Toaster } from "react-hot-toast";

function addEmployee() {
  const [employee, setEmployee] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleCreateEmployee = async () => {
    try {
      toast.loading("Creating employee...");
      const createdEmployee = await createEmployee(employee);
      toast.dismiss();
      toast.success("Employee created");
    } catch (error) {
      toast.error("Failed to create employee");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <div className="w-4/5">
        <div className="  mt-10 mb-5">
          <span className=" text-3xl   w-fit">New Employee</span>
        </div>
        <div className="  flex-col w-full h-1/2 rounded-lg bg-[#D3D2D1]">
          <div className="flex flex-col justify-between p-5 h-full">
            <div className="flex mb-4 ">
              <input
                type="text"
                placeholder="Name..."
                value={employee.name}
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
                onChange={(e) =>
                  setEmployee({ ...employee, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email..."
                value={employee.email}
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password..."
                value={employee.password}
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
                onChange={(e) =>
                  setEmployee({ ...employee, password: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Role..."
                value={employee.role}
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
                onChange={(e) =>
                  setEmployee({ ...employee, role: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
                onClick={handleCreateEmployee}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default addEmployee;
