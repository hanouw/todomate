import React, { useState } from "react";

function CalendarSection() {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 1)); // Starting with May 2024

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonth = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonth;
    });
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = new Date(year, month, 1).getDay(); // Get the starting day of the week (0 = Sunday, 6 = Saturday)

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg w-full">
      <div className="flex justify-between w-full">
        <div className="text-lg font-semibold mb-4">{`${year}년 ${
          month + 1
        }월`}</div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={handlePrevMonth}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
            onClick={handleNextMonth}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-5 w-full mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center font-[Pretendard-Medium] text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-5 w-full">
        {/* Empty divs for the start of the month */}
        {[...Array(startDay)].map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2"></div>
        ))}
        {dates.map((date) => (
          <div
            className="grid justify-center place-items-center text-sm mb-1"
            key={date}
          >
            <div
              className={`grid place-items-center mb-[1px] h-[23px] w-[23px] rounded-lg ${
                date === 3 ? "bg-black text-white" : "bg-my-color-gray"
              }`}
            >
              <span className="font-[Pretendard-Regular] text-sm">
                {date === 1 || date === 3 ? 1 : <></>}
              </span>
            </div>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarSection;
