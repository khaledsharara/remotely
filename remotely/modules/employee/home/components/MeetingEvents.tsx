import { useEffect, useState } from "react";
import "../styles/event.css";
import { getAllTask } from "../utils/homeApis";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";
import { Task } from "../../../Manager/Dashboard/utils/types";

function MeetingEvent() {
  const user = useSelector(selectUser);
  const [data, setData] = useState<Task[]>([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTask(user.user ?? "");
        // If duedate is after today, set data
        const today = new Date();
        const filteredData = res.filter((task: Task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate >= today;
        });
        setData(filteredData);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    fetchTasks();
  }, []);

  // Static filler data for events

  function formatDateTime(datetime: string) {
    const date = new Date(datetime);
    const localDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
    });
    const localTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return {
      date: localDate,
      time: localTime,
    };
  }

  return (
    <div className="event-root p-4 h-full">
      <div className="grid auto-rows-max my-2">
        {data.map((event, index: number) => {
          return (
            <div
              className="event border-l-[3px] border-primary pl-5 relative"
              key={index}
            >
              <div className="absolute top-1 -left-[13px] rounded-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#DEDEDE"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#287AFF"
                  className="size-6"
                >
                  <circle cx="12" cy="12" r="10" fill="#BFBFBF"></circle>
                  {event.completed === false ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  ) : event.completed === true ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  )}
                </svg>
              </div>

              <div className="event-date">
                {formatDateTime(event.dueDate).date}
              </div>
              <div className="event-card rounded-[20px]">
                <div className="event-body">
                  <div className="event-title">{event.title}</div>
                </div>
                <div className="event-time">
                  {formatDateTime(event.dueDate).time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeetingEvent;
