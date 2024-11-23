import "../styles/PerformanceCard.css";

const grades = [
  {
    name: "On Time",
    grade: "A",
  },
  {
    name: "Late",
    grade: "B",
  },
];

function PerformanceCard() {
  return (
    <div className="performance-card-root">
      <div>
        <div className="performance-title">Performance</div>
      </div>
      <div className="flex flex-col w-full items-center">
        <div className="w-full">
          {grades.map((grade, index) => (
            <div
              key={index}
              className={`flex justify-between text-white ${
                index === grades.length - 1
                  ? "" // No border for the last item
                  : "border-b-[1px] border-white"
              } py-4`}
            >
              <h1>{grade.name}</h1>
              <h1 className="mr-2">{grade.grade}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;
