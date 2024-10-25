import SubmissionCard from "./PostCard";
import "../styles/AltActivityFeed.css";

function AltActivityFeed() {
  // Static filler data for unread activities
  const data = [
    {
      headline: "New Assignment Posted",
      dueDate: "2024-11-10",
    },
    {
      headline: "Group Project Update",
      dueDate: "2024-11-12",
    },
    {
      headline: "Quiz Reminder",
      dueDate: "2024-11-07",
    },
  ];

  // Static variable to check if all caught up
  const isAllCaughtUp = data.length === 0;

  return (
    <>
      {/* All Caught Up Message */}
      {isAllCaughtUp && (
        <div className="AAF-root-off">
          <div className="AAF-title">All Caught Up!</div>
          <div className="AAF-body"></div>
        </div>
      )}

      {/* New Activities Section */}
      {!isAllCaughtUp && (
        <div className="w-full">
          <div className="AAF-title">New Tasks</div>
          <div className="w-full">
            {data.map((activity, index) => {
              return (
                <SubmissionCard
                  key={index}
                  type="Activity"
                  Headline={activity.headline}
                  DueDate={activity.dueDate}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AltActivityFeed;
