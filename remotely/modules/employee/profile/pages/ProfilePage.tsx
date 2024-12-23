import ProfileCard from "../components/Profilecard";
import ProgressDonutCard from "../components/ProgressDonutCard";
import SubmissionCard from "../components/PostCard";
import SubmissionsHeader from "../components/SubmissionsHeader";
import { Task } from "../../../Manager/Dashboard/utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../shared/utils/userSlice";
import { getAllTask } from "../utils/profileApis";

function ProfilePage() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Task[]>([]);
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getAllTask(user.user ?? "");
        setData(res);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };

    if (user.user) {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [query, data]);

  return (
    <div className="px-12 py-4">
      <ProfileCard />
      <div className="flex justify-center my-5">
        <ProgressDonutCard />
      </div>
      <div>
        <SubmissionsHeader query={query} setQuery={setQuery} />
      </div>
      {/* Submissions */}
      {data.length !== 0 && (
        <>
          <div>
            {filteredData.map((submission, index) => (
              <SubmissionCard
                key={index}
                Headline={submission.title}
                DueDate={submission.dueDate}
              />
            ))}
          </div>
          <div className="flex justify-center m-5">
            <button className="items-center rounded-full px-4 py-2 bg-primary outline-none opacity-50">
              <div className="flex flex-row justify-between gap-6">
                <span className="pr-1 text-sm text-white">View More</span>
                <span className="self-end">
                  <svg
                    className="fill-white h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
