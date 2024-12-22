import { useEffect, useState } from "react";
import ProgressDonut from "./ProgressDonut";
import { Task } from "../../../Manager/Dashboard/utils/types";
import { getAllTask } from "../utils/profileApis";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";

function ProgressDonutCard() {
  const user = useSelector(selectUser);

  const [data, setData] = useState<
    {
      completed: number;
      total: number;
      chartName: string;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTask(user.user ?? "");
        // Split between completed and uncompleted
        const completed = res.filter((task: Task) => task.completed);
        const uncompleted = res.filter((task: Task) => !task.completed);
        setData([
          {
            completed: completed.length,
            total: res.length,
            chartName: "Completed Tasks",
            color: "#287AFF",
          },
          {
            completed: uncompleted.length,
            total: res.length,
            chartName: "Uncompleted Tasks",
            color: "#287AFF",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-row">
      {data.map((assignmentProgress, index) => {
        return (
          <div key={index}>
            <ProgressDonut assignmentProgress={assignmentProgress} />
          </div>
        );
      })}
    </div>
  );
}

export default ProgressDonutCard;
