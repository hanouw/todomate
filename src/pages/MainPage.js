import React, { useCallback, useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import CalendarSection from "../components/main/CalendarSection";
import TasksSection from "../components/main/TasksSection";
import { addTask, updateTask } from "../api/TodomateApi";
import useCustomMove from "../hooks/useCustomMove";
import { useSelector } from "react-redux";

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);
  const loginInfo = useSelector((state) => state.loginSlice);

  const monthIsChanged = useCallback((result) => {
    setCurrentDate(result);
  }, []);

  const taskIsChanged = async ({ type, value, tid }) => {
    if (type == "NORMAL") {
      const taskDTO = {
        finished: false,
        detail: value,
        type: type,
        date: getFormattedDate(),
        mid: loginInfo.mid ? loginInfo.mid : 1,
      };
      addTask(taskDTO).then(() => {
        setRefresh(!refresh);
      });
    } else if (type == "MODIFY") {
      updateTask({
        value: value,
        tid: tid,
      }).then(() => {
        setRefresh(!refresh);
      });
    } else {
      setRefresh(!refresh);
    }
  };

  const getFormattedDate = () => {
    let result = year;
    month > 9 ? (result += `-${month}`) : (result += `-0${month}`);
    day > 9 ? (result += `-${day}`) : (result += `-0${day}`);
    return result;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const { moveToLogin } = useCustomMove();

  const loginInfo = useSelector((state) => state.loginSlice);

  useEffect(() => {
    if (loginInfo) {
      alert("로그인이 필요합니다");
      moveToLogin();
    }
  }, []);

  return (
    <BasicLayout>
      <div className="grid place-items-center">
        <div className="flex justify-center w-full p-4 lg:p-16 select-none">
          <div className="text-xl lg:text-2xl font-[Pretendard-Bold]">{`${year}년 ${month}월 ${day}일`}</div>
        </div>
        <div className="lg:grid lg:grid-cols-2 max-w-xs lg:max-w-4xl w-full gap-5">
          <CalendarSection callbackFn={monthIsChanged} refresh={refresh} />
          <TasksSection
            year={year}
            month={month}
            day={day}
            callbackFn={taskIsChanged}
            refresh={refresh}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
