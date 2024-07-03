import React from "react";

function CalendarSection() {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg w-full">
      <div className="flex justify-between w-full">
        <div className="text-lg font-semibold mb-4">2024년 5월</div>
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
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
            class="size-6"
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
        {/* Arrays() 괄호 안에 숫자를 조정해서 어디부터 시작인지 알려줌 */}
        {[...Array(2)].map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2"></div>
        ))}
        {dates.map((date) => (
          <div className="grid justify-center place-items-center text-sm mb-1">
            <div
              key={date}
              className={`grid place-items-center mb-[1px] h-[23px] w-[23px] rounded-lg ${
                date === 1 || date === 3
                  ? "bg-black text-white"
                  : "bg-my-color-gray"
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
