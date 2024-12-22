import PerformanceCard from "../components/PerformanceCard";
import ProfileCard from "../components/Profilecard";
import ProgressDonutCard from "../components/ProgressDonutCard";
import SubmissionCard from "../components/PostCard";
import SubmissionsHeader from "../components/SubmissionsHeader";

function ProfilePage() {
  // Static filler data for submissions
  const data = [
    {
      headline: "Assignment 1 Submitted",
      activity: "You submitted your first assignment.",
      dueDate: "2024-10-10",
      instructorName: "Dr. Smith",
      gradeLetter: "A",
      grade: 95,
    },
    {
      headline: "Midterm Project",
      activity: "Your midterm project has been graded.",
      dueDate: "2024-10-15",
      instructorName: "Prof. Johnson",
      gradeLetter: "B+",
      grade: 88,
    },
    {
      headline: "Final Exam Scheduled",
      activity: "Your final exam is scheduled for next week.",
      dueDate: "2024-11-01",
      instructorName: "Dr. Brown",
      gradeLetter: "N/A",
      grade: null,
    },
  ];

  return (
    <div className="px-12 py-4">
      <ProfileCard />
      <div className="flex justify-center my-5">
        <ProgressDonutCard />
      </div>
      <div>
        <SubmissionsHeader />
      </div>
      {/* Submissions */}
      {data.length !== 0 && (
        <>
          <div>
            {data.map((submission, index) => (
              <SubmissionCard
                key={index}
                Headline={submission.headline}
                DueDate={submission.dueDate}
                instructorName={submission.instructorName}
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
