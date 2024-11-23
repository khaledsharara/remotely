interface Employee {
  primaryKey: string;
  name: string;
}

const Logs: React.FC = () => {
  const employees: Employee[] = [
    { primaryKey: "1", name: "Ada Lovelace" },
    // Add more filler employees as needed
  ];
  const logs = Array(10).fill({
    date: "20/10/2024",
    logIn: "10:00 AM",
    logOut: "5:33 PM",
  });
  const employee = employees[0];

  return (
    <div className="flex flex-col  w-full">
      <div className="flex flex-row items-center justify-between w-full ">
        <span className="flex text-6xl ml-24">{employee.name}</span>
        <div className="flex ml-auto justify-end items-end">
          <div className="mr-10  flex px-6 py-2 rounded-3xl border-2 border-black overflow-hidden max-w-md font-sans">
            <input
              type="email"
              placeholder="Search Something..."
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full mt-5 border-b-[1px] border-black ml-28  py-5">
        <div className="flex w-[20%] text-xl text-slate-700 ">Date</div>
        <div className="flex  text-xl text-slate-700 ">
          <span className="px-9 ">Logged-in</span>
          <span className="px-9 ">Logged-out</span>
        </div>
      </div>
      {logs.map((log, index) => (
        <div key={index} className="flex flex-col w-full ml-28 ">
          <div className="flex flex-row  ">
            <div className="flex w-[20%] font-sans  justify-center py-5 border-r-[1px] border-black text-lg text-slate-700 bg-gray-300 shadow-xl">
              {log.date}
            </div>
            <div className="flex text-lg text-slate-700 py-5 px-14 border-r-[1px] border-black font-sans bg-gray-300 shadow-xl">
              {log.logIn}
            </div>
            <div className="flex text-lg text-slate-700 py-5 px-20 font-sans bg-gray-300 rounded-tr-lg shadow-xl">
              {log.logOut}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Logs;
