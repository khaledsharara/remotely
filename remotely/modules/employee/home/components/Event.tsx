import { useEffect, useState } from 'react';
import '../styles/event.css';

function Event({ data, loading, error }: { data: any; loading: boolean; error: any }) {
  // format the date time in each event by initing a list of dates
  var [datesStr, setDatesStr] = useState<string[]>([]);
  var [timesStr, setTimesStr] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !error) {
      data.forEach((event: any) => {
        const dateStr = event.datetime;
        const dateNum = Date.parse(dateStr);
        const date = new Date(dateNum);
        const monthnumber = date.getMonth().toString().padStart(2, '0');
        const daynumber = date.getDate().toString();
        const dateStrNew = date.toLocaleDateString('en-us', { weekday: 'long' }) + ', ' + daynumber + '.' + monthnumber;
        const timeStrnew = date.toLocaleTimeString('en-us', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        setDatesStr((datesStr) => [...datesStr, dateStrNew]);
        setTimesStr((timesStr) => [...timesStr, timeStrnew]);
      });
    }
  }, [data, loading, error]);

  // get the number of events to show
  // const numEvents = data.length;

  return (
    <>
      {loading ? (
        <div className="event-root">
          <p className="alt-text">Loading...</p>
        </div>
      ) : error ? (
        <div className="event-root">
          <p className="alt-text">Error: {error.message}</p>
        </div>
      ) : (
        <div className="event-root">
          <div className="event-content">
            {data.map((event: any, index: number) => {
              return (
                <div className="event" key={index}>
                  <div className="event-date">{datesStr[index]}</div>
                  <div className="event-card">
                    <div className="event-body">
                      <div className="event-title">{event.meeting_name}</div>
                      <div className="event-link">{event.link}</div>
                    </div>
                    <div className="event-time">{timesStr[index]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Event;
