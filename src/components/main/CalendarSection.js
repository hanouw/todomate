import React, { useEffect, useState } from "react";

const CalendarSection = ({ callbackFn }) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    callbackFn(currentDate);
  }, [currentDate]);

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

  const dayClicked = (clickedDate) => {
    setCurrentDate(new Date(year, month, clickedDate));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = new Date(year, month, 1).getDay(); // 0 = 일요일, 6 = 토요일

  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg w-full border">
      <div className="flex justify-between w-full pb-7">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={handlePrevMonth}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <button className="font-[Pretendard-Regular]">이전달</button>
        </div>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={handleNextMonth}
        >
          <button className="font-[Pretendard-Regular]">다음달</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* 월화수목금토일 */}
      <div className="grid grid-cols-7 gap-3 w-full mb-5">
        {days.map((day) => (
          <div
            key={day}
            className="text-center font-[Pretendard-Medium] text-sm"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-x-3 w-full">
        {/* 시작한 날 ...Array() 안에 작성 */}
        {[...Array(startDay)].map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2"></div>
        ))}
        {dates.map((date) => (
          <div
            className="grid justify-center place-items-center text-sm mb-1"
            key={date}
            onClick={() => dayClicked(date)}
          >
            <div
              className={`grid place-items-center mb-[1px] h-[23px] w-[23px] rounded-lg ${
                date === 3 ? "bg-black text-white" : "bg-my-color-gray"
              }`}
            >
              <span className="font-[Pretendard-SemiBold] text-sm">
                {date === 1 || date === 3 ? 1 : <></>}
              </span>
            </div>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarSection;
