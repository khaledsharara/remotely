import "../styles/event.css";

function MeetingEvent() {
  // Static filler data for events
  const data = [
    {
      meeting_name: "Team Sync",
      datetime: "2024-10-30T10:00:00Z",
      status: 0,
    },
    {
      meeting_name: "Project Kickoff",
      datetime: "2024-11-01T14:00:00Z",
      status: 1,
    },
    {
      meeting_name: "Client Review",
      datetime: "2024-11-05T16:00:00Z",
      status: 2,
    },
  ];

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
    <div className="event-root p-4">
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
                  {event.status === 0 ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  ) : event.status === 1 ? (
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
                {formatDateTime(event.datetime).date}
              </div>
              <div className="event-card rounded-[20px]">
                <div className="event-body">
                  <div className="event-title">{event.meeting_name}</div>
                </div>
                <div className="event-time">
                  {formatDateTime(event.datetime).time}
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
