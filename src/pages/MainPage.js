import React, { useCallback, useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import CalendarSection from "../components/main/CalendarSection";
import TasksSection from "../components/main/TasksSection";
import { addTask, updateTask } from "../api/TodomateApi";
import useCustomMove from "../hooks/useCustomMove";
import { useSelector } from "react-redux";
import {
  friendAccept,
  friendBanned,
  getFriendRequest,
  getFriends,
  getName,
} from "../api/memberApi";

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [refresh, setRefresh] = useState(false);
  const loginInfo = useSelector((state) => state.loginSlice);
  const [friends, setFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [pageOwner, setPageOwner] = useState({});

  const monthIsChanged = useCallback((result) => {
    setCurrentDate(result);
  }, []);

  const taskIsChanged = async ({ type, value, tid }) => {
    if (type === "NORMAL") {
      const taskDTO = {
        finished: false,
        detail: value,
        type: type,
        date: getFormattedDate(),
        mid: pageOwner.mid ? pageOwner.mid : 1,
      };
      addTask(taskDTO).then(() => {
        setRefresh(!refresh);
      });
    } else if (type === "MODIFY") {
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

  useEffect(() => {
    if (!loginInfo.email) {
      alert("로그인이 필요합니다");
      moveToLogin();
    }
    getFriends(pageOwner.mid).then((data) => {
      setFriends(data.RESULT);
      console.log(data);
    });
    getFriendRequest(pageOwner.mid).then((data) => {
      setFriendRequest(data.RESULT);
      console.log(data);
    });
  }, [pageOwner, showFriends]);

  useEffect(() => {
    getName(loginInfo.mid).then((data) => {
      setPageOwner(data.RESULT);
    });
  }, []);

  return (
    <BasicLayout>
      <div className="grid place-items-center mb-20">
        <div className="flex justify-center w-full pt-8 lg:p-12 select-none">
          <div>
            <div className="flex justify-center items-center">
              <div className="text-xl lg:text-2xl font-[Pretendard-Bold]">{`${year}년 ${month}월 ${day}일`}</div>
              {pageOwner.mid == loginInfo.mid ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 ml-2 lg:ml-4 cursor-pointer"
                  onClick={() => {
                    setShowFriends(!showFriends);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="size-6 ml-2 lg:ml-4 cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                  />
                </svg>
              )}
            </div>

            <div className="font-[Pretendard-SemiBold] text-base lg:text-lg text-center m-2 p-2">
              {pageOwner.name}의 Todo
            </div>
          </div>
          {/* 친구 목록 */}
          <div
            className={`flex justify-between absolute z-10 mt-20 max-w-xs lg:max-w-4xl w-full bg-white rounded-md shadow-lg overflow-auto ${
              showFriends ? "border border-gray-300 max-h-100" : "max-h-0"
            }`}
          >
            <div className="p-4 items-center text-center w-full">
              <div className="font-[Pretendard-Bold] border-b select-none pb-2">
                친구 목록
              </div>
              {friends.length == 0 ? (
                <div className="font-[Pretendard-Regular] text-xs lg:text-lg p-5 lg:p-16 select-none">
                  아직 추가한
                  <br className="inline lg:hidden"></br>
                  <span> 친구가 없습니다</span>
                </div>
              ) : (
                <>
                  {friends.map((item, index) => (
                    <div
                      className="flex justify-between items-center max-h-10 font-[Pretendard-Base] select-none h-10"
                      key={index}
                    >
                      <span
                        className="p-2 flex items-center rounded-lg hover:bg-gray-100 transition-all duration-400 ease-in-out cursor-pointer"
                        onClick={() => {
                          setPageOwner(item);
                          setShowFriends(false);
                        }}
                      >
                        {item.name}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 cursor-pointer mr-2"
                        onClick={() => {
                          friendBanned({
                            bymid: loginInfo.mid,
                            tomid: item.mid,
                          }).then(() => {
                            setRefresh(!refresh);
                            setShowFriends(!showFriends);
                          });
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="p-4 text-center w-full">
              <div className="font-[Pretendard-Bold] border-b select-none pb-2">
                친구 요청
              </div>
              {friendRequest.map((item, index) => (
                <div
                  className="flex justify-between items-center max-h-10 font-[Pretendard-Base] select-none rounded-lg h-10"
                  key={index}
                >
                  <span className="p-2 flex items-center">{item.name}</span>
                  <div className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 cursor-pointer"
                      onClick={() => {
                        friendAccept({
                          bymid: loginInfo.mid,
                          tomid: item.mid,
                          tf: true,
                        }).then(() => {
                          setRefresh(!refresh);
                          setShowFriends(!showFriends);
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6 cursor-pointer mr-2"
                      onClick={() => {
                        friendAccept({
                          bymid: loginInfo.mid,
                          tomid: item.mid,
                          tf: false,
                        }).then(() => {
                          setRefresh(!refresh);
                          setShowFriends(!showFriends);
                        });
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-2 max-w-xs lg:max-w-4xl w-full gap-5">
          <CalendarSection
            callbackFn={monthIsChanged}
            refresh={refresh}
            pageOwner={pageOwner}
          />
          <TasksSection
            year={year}
            month={month}
            day={day}
            pageOwner={pageOwner}
            callbackFn={taskIsChanged}
            refresh={refresh}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
