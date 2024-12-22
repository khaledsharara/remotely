import { useState } from "react";
import Calendar from "./Calendar";
import "../styles/CalendarCard.css";
import MeetingEvent from "./MeetingEvents";

function CalendarCard() {
  // init the date
  const date = useState<Date>(new Date());
  return (
    <div className="w-full h-[400px] rounded-[30px] grid grid-cols-2 bg-button py-8">
      {/* Upcoming Meetings */}
      <div className="h-full overflow-y-auto w-full flex flex-col pl-8">
        <div className="flex flex-row justify-between mb-2">
          <span className="text-xl font-medium">Upcoming Tasks</span>
        </div>
        <MeetingEvent />
      </div>
      {/* Calendar */}
      <div className="h-full w-full px-10 py-5">
        <div className="bg-transparent rounded-[30px] h-full py-5 px-10">
          <Calendar date={date[0]} />
        </div>
      </div>
    </div>
  );
}

export default CalendarCard;
