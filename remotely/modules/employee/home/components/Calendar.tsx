import { useState, useEffect } from "react";
import "../styles/CalendarCard.css";

function Calendar({ date }: { date: Date }) {
  const month = date.getMonth();

  const [days, setDays] = useState(new Map());
  const [numRows, setNumRows] = useState(0);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const newDays = new Map();
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(date.getFullYear(), month, i);
      newDays.set(i, day.getDay());
    }
    setDays(newDays);
  }, [date, month]);

  useEffect(() => {
    setNumRows(Math.ceil((days.size + Array.from(days.values())[0]) / 7));
  }, [days]);

  useEffect(() => {
    if (numRows > 0 && days.size > 0) {
      setReadyToRender(true);
    }
  }, [numRows, days]);

  return (
    <div className="h-full w-full mr-20 flex flex-col">
      <div className="border-primary rounded-full border w-fit px-3 mb-5">
        <h1 className="text-primary">
          {date.toLocaleString("default", { month: "long" })}
        </h1>
      </div>
      <div className="h-full">
        <table className="w-full h-full ">
          <thead>
            <tr className="text-primary border-b-2 border-primary">
              <th className="font-semibold pb-2">S</th>
              <th className="font-semibold pb-2">M</th>
              <th className="font-semibold pb-2">T</th>
              <th className="font-semibold pb-2">W</th>
              <th className="font-semibold pb-2">T</th>
              <th className="font-semibold pb-2">F</th>
              <th className="font-semibold pb-2">S</th>
            </tr>
          </thead>
          <tbody>
            {readyToRender &&
              Array.from(Array(numRows).keys()).map((row) => {
                // Check if this is the last row
                const isLastRow = row === numRows - 1;
                return (
                  <tr
                    key={row}
                    className={isLastRow ? "" : "border-b-2 border-black"}
                  >
                    {Array.from(Array(7).keys()).map((col) => {
                      const day =
                        row * 7 + col - Array.from(days.values())[0] + 1;
                      return (
                        <td key={col} className="text-center font-semibold">
                          {day > 0 && day <= days.size ? day : ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Calendar;
