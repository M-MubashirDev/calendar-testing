import { startOfMonth, endOfMonth, format, parse, addMonths } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [todaysDate, setTodaysDate] = useState(new Date().getDate());
  const [dates, setDates] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const MonthJourney = useMemo(() => {
    const monthStartsAt = startOfMonth(currentDate);
    const monthsEndAt = endOfMonth(currentDate);
    setStartMonth(format(monthStartsAt, "MM-dd EE"));
    setEndMonth(format(monthsEndAt, "MM-dd EE"));
    // return { monthStartsAt, monthsEndAt };
  }, [currentDate]);

  useEffect(() => {
    const start = 1;
    const parsedDate = parse(endMonth, "MM-dd EEE", new Date());
    const end = parsedDate.getDate();

    let range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    for (let i = 0; i < startOfMonth(currentDate).getDay(); i++) {
      range.unshift(null);
    }
    setDates(range);
  }, [MonthJourney, currentDate, endMonth]);

  const onClickNext = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const onClickCurrent = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  console.log(todaysDate);

  return (
    <div className="max-w-full lg:max-w-[70%] sm:min-w-[320px] py-6 gap-4 text-[#523939] flex flex-col items-center justify-center rounded-lg">
      {/* Header: Current/Next Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 w-full px-4">
        <button
          disabled={currentDate.getMonth() === new Date().getMonth()}
          onClick={onClickCurrent}
          className={`w-full sm:w-1/2 p-3 border border-[#523939] rounded-[20px] transition duration-200 font-medium text-base sm:text-xl ${
            currentDate.getMonth() === new Date().getMonth()
              ? "bg-[#523939] text-white cursor-not-allowed"
              : "bg-white text-[#523939] hover:bg-[#523939] hover:text-white"
          }`}
        >
          Current
        </button>
        <button
          disabled={
            currentDate.getMonth() === addMonths(new Date(), 1).getMonth()
          }
          onClick={onClickNext}
          className={`w-full sm:w-1/2 p-3 border border-[#523939] rounded-[20px] transition duration-200 font-medium text-base sm:text-xl ${
            currentDate.getMonth() === addMonths(new Date(), 1).getMonth()
              ? "bg-[#523939] text-white cursor-not-allowed"
              : "bg-white text-[#523939] hover:bg-[#523939] hover:text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Days and Dates Container with Horizontal Scrolling */}
      <div className="w-full px-4 overflow-x-auto pb-4">
        <div className="min-w-[350px]">
          {" "}
          {/* Adjust min-width as needed */}
          {/* Days of the Week Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="font-medium text-sm sm:text-lg text-center"
              >
                {day}
              </div>
            ))}
          </div>
          {/* Dates Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-4">
            {dates.map((val, i) => {
              if (val === null) {
                // Empty cell for alignment
                return <div key={i} />;
              }

              // Determine if the date is in the past, today, or future
              const isPast = val < todaysDate;
              const isToday = val === todaysDate;
              const isFuture = val > todaysDate;

              // Determine styling based on date state
              let style =
                "flex items-center justify-center aspect-square w-10 h-10 sm:w-12 sm:h-12 rounded-full text-xs sm:text-sm font-semibold transition duration-200";

              if (isPast) {
                style +=
                  " bg-[#EAEAEA] text-black cursor-not-allowed opacity-50";
              } else if (isToday) {
                style +=
                  " underline font-bold bg-white border border-[#523939] text-[#523939] cursor-pointer hover:bg-[#523939] hover:text-white";
              } else if (isFuture) {
                style +=
                  " border border-[#523939] text-black cursor-pointer hover:bg-[#523939] hover:text-white";
              }

              return (
                <button
                  className={style}
                  key={i}
                  onClick={() => {
                    // Handle date click if necessary
                  }}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
