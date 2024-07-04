import React from "react";

const TasksSection = () => {
  return (
    <div className="flex flex-col rounded-lg bg-whitepl-4">
      <TaskCategory title="할 일" tasks={["아침밥 먹기", "React 공부하기"]} />
      <TaskCategory
        title="루틴"
        tasks={[
          "Python 공부하기",
          "Java 복습하기",
          "운동하기",
          "노트 정리하기",
        ]}
      />
    </div>
  );
};

const TaskCategory = ({ title, tasks }) => {
  return (
    <div className="mb-8 ml-10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 py-2">
          {title === "할 일" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="size-5"
            >
              <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          )}

          <div className="font-[Pretendard-SemiBold] text-base">{title}</div>
          <button className="w-16 h-6 bg-white rounded-xl justify-center border-2 border-gray-600 text-sm font-[Pretendard-Regular]">
            추가하기
          </button>
        </div>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task} className="flex justify-between py-1 mt-3">
            <div
              className={`h-[23px] w-[23px] grid place-items-center rounded-lg ${
                task === "아침밥 먹기" ? "bg-black" : "bg-my-color-gray"
              }`}
            >
              {task === "아침밥 먹기" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="white"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              ) : (
                <></>
              )}
            </div>
            <span className="pl-3 rounded-lg flex-1 font-[Pretendard-Light]">
              {task}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksSection;
