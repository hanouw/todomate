import React, { useCallback, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import CalendarSection from "../components/main/CalendarSection";
import TasksSection from "../components/main/TasksSection";

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthIsChanged = useCallback((result) => {
    setCurrentDate(result);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  return (
    <BasicLayout>
      <div className="grid place-items-center">
        <div className="flex justify-center w-full p-10">
          <div className="text-2xl font-[Pretendard-Bold]">{`${year}년 ${
            month + 1
          }월 ${day}일`}</div>
        </div>
        <div className="grid grid-cols-2 max-w-4xl w-full">
          <CalendarSection callbackFn={monthIsChanged} />
          <TasksSection />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
