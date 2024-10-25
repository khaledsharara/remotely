import ProgressDonut from "./ProgressDonut";

function ProgressDonutCard() {
  return (
    <div className="flex flex-row">
      <ProgressDonut
        assignmentProgress={{
          completed: 4,
          total: 38,
          chartName: "Missed Assignments",
          color: "#287AFF",
        }}
      />
      <ProgressDonut
        assignmentProgress={{
          completed: 18,
          total: 69,
          chartName: "Submitted Assignments",
          color: "#287AFF",
        }}
      />
    </div>
  );
}

export default ProgressDonutCard;
