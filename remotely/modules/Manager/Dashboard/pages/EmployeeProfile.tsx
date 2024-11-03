const employees = [
  { primaryKey: "1", name: "Ada Lovelace" },
  { primaryKey: "2", name: "Alan Turing" },
  { primaryKey: "3", name: "Grace Hopper" },
  // Add more filler employees as needed
];

type Employee = {
  attachment: string;
  status: string;
  grade?: number;
};

const employeeList = [
  {
    attachment: "Attachment_Title.pdf",
    status: "Done",
    verification: "Unverified",
  },
  {
    attachment: "Attachment_Title.pdf",
    status: "Done",
    verification: "Verified",
  },
  {
    attachment: "Attachment_Title.pdf",
    status: "Not Done",
    verification: "Unverified",
  },
  {
    attachment: "Attachment_Title.pdf",
    status: "Not Done",
    verification: "Verified",
  },
  // Add more filler submissions as needed
];

function SubmissionsList({ employeeList }: { employeeList: Employee[] }) {
  return (
    <div>
      {employeeList.map((employee, index) => (
        <div
          key={index}
          className="flex justify-between p-2 border-b-[1px] border-gray-300"
        >
          <div>{employee.attachment}</div>
          <div>{employee.status}</div>
          <div>
            {employee.grade != null ? `Grade: ${employee.grade}` : "No Grade"}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmployeeProfile() {
  // Using a placeholder teacher for demonstration
  const teacher = employees[0];

  return (
    <div className="w-full p-5">
      {/* Big Name section */}
      <div className="flex flex-row justify-between border-black border-[1px] rounded-[30px] w-full px-[2rem] py-[1rem]">
        <div>
          <div className="text-title font-medium">{teacher.name}</div>
          <div className="border-[1px] border-black w-fit rounded-full px-4 mt-2">
            Grader
          </div>
        </div>
        <img alt="Profile pic" className="h-32 justify-self-center" />
      </div>
      {/* Submissions section */}
      <SubmissionsList employeeList={employeeList} />
    </div>
  );
}

export default EmployeeProfile;
