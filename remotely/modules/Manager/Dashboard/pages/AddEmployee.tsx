function addEmployee() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-4/5">
        <div className="  mt-10 mb-5">
          <span className=" text-3xl   w-fit">New Employee</span>
        </div>
        <div className="  flex-col w-full h-1/2 rounded-lg bg-[#D3D2D1]">
          {" "}
          <div className="flex flex-col justify-between p-5 h-full">
            <div className="flex mb-4 ">
              <input
                type="text"
                placeholder="Name..."
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Email..."
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Password..."
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Role..."
                className="w-full bg-transparent border-b-2  pb-2 text-base   border-blue-600 transition-colors duration-300 outline-none focus:outline-none placeholder-gray-500"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
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
