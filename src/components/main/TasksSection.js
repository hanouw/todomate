import React, { useEffect, useState } from 'react';
import { dailyRoutineFinished, deleteDailyRoutine, deleteTask, getNormalTaskList, getRoutineTaskList, taskFinishedState } from '../../api/TodomateApi';
import RotineAddModal from '../rotine/RotineAddModal';
import { useSelector } from 'react-redux';
import RoutineModifyModal from '../rotine/RoutineModifyModal';

const TasksSection = ({ year, month, day, callbackFn, refresh }) => {
  const [normalList, setNormalList] = useState([]);
  const [routineList, setRoutineList] = useState([]);

  const loginInfo = useSelector((state) => state.loginSlice);

  useEffect(() => {
    getNormalTaskList({ year: year, month: month, day: day }).then((response) => {
      setNormalList(response);
    });
    getRoutineTaskList({ mid: loginInfo.mid, year: year, month: month, day: day }).then(
      (response) => {
        setRoutineList(response);
      }
    );
  }, [year, month, day, refresh]);
  return (
    <div className="flex flex-col rounded-lg bg-white max-h-[450px] overflow-y-auto pr-3">
      <TaskCategory title="할 일" tasks={normalList} callbackFn={callbackFn} />
      <TaskCategory title="루틴" tasks={routineList} callbackFn={callbackFn} />
    </div>
  );
};

const TaskCategory = ({ title, tasks, callbackFn }) => {
  const [showInputField, setShowInputField] = useState(false);
  const [showThreeDot, setShowThreeDot] = useState(-1);
  const [isModify, setIsModify] = useState(-1);
  const [inputVal, setInputVal] = useState();

  useEffect(() => {
    setShowInputField(false);
  }, [tasks]);


  const addTaskClicked = () => {
    if (inputVal != undefined) {
      callbackFn({ type: 'NORMAL', value: inputVal });
      setShowInputField(false);
      setInputVal(null);
    }
  };

  const inputChange = (e) => {
    setInputVal(e.target.value);
  };

  const finishedButtonClicked = (tid) => {
    taskFinishedState({ tid: tid }).then(() => {
      callbackFn({ type: 'refresh' });
    });
  };

  const taskModifyClicked = (tid, originVal) => {
    if (inputVal == '') {
      callbackFn({ type: 'MODIFY', value: originVal, tid: tid });
    } else {
      callbackFn({ type: 'MODIFY', value: inputVal, tid: tid });
    }
    setIsModify(-1);
  };

  // ======================================================= Rotine
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [drId, setDrId] = useState("");

  const routineFinishedClicked = (drId) => {
    dailyRoutineFinished({ drId: drId }).then(() => {
      callbackFn({ type: 'refresh' });
    });
  };


  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 py-1 border-b-2 w-full border-gray-800">
          {title === '할 일' ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-5">
                <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
              </svg>
              <div className="font-[Pretendard-SemiBold] text-base select-none">{title}</div>
              {!showInputField ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                  onClick={() => {
                    setShowInputField(!showInputField);
                    setShowThreeDot(-1);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              ) : (
                <button
                  className="w-8 h-5 bg-white rounded-xl justify-center border-2 border-gray-600 text-xs font-[Pretendard-Regular] select-none"
                  onClick={() => setShowInputField(!showInputField)}
                >
                  취소
                </button>
              )}
            </>
          ) : (
            <>
              {isAddModalOpen && <RotineAddModal closeModal={() => setIsAddModalOpen(false)} callbackFn={callbackFn} />}
              {isModifyModalOpen && <RoutineModifyModal closeModal={() => setIsModifyModalOpen(false)} callbackFn={callbackFn} drId={drId}/>}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="font-[Pretendard-SemiBold] text-base select-none">{title}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={() => setIsAddModalOpen(true)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </>
          )}
        </div>
      </div>
      <ul>
        {/* 새 할일 작성 위한 Input Field 여부 */}
        {showInputField ? (
          <div className="flex py-1 mt-3 justify-between">
            <div className={'h-[23px] w-[23px] grid place-items-center rounded-lg bg-my-color-gray'}></div>
            <input
              className="border-b-2 border-my-color-gray text-sm ml-3 w-4/5"
              placeholder="새 할일을 입력하세요"
              onChange={inputChange}
            />
            <button
              className="w-16 h-6 bg-white rounded-xl justify-center border-2 border-gray-600 text-xs font-[Pretendard-Regular] select-none"
              onClick={() => addTaskClicked()}
            >
              추가하기
            </button>
          </div>
        ) : (
          <></>
        )}
        {title === '할 일' ? (
          <>
            {tasks.map((task) => (
              <li key={task.tid} className="flex justify-between py-1 mt-3">
                <div
                  className={`h-[23px] w-[23px] grid place-items-center rounded-lg ${
                    task.finished == true ? 'bg-black' : 'bg-my-color-gray'
                  }`}
                  onClick={() => finishedButtonClicked(task.tid)}
                >
                  {/* 완료 여부 검은 체크박스 / 회색 체크박스 */}
                  {task.finished == true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="white"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <></>
                  )}
                </div>

                {/* 수정 클릭 여부 */}
                {isModify == task.tid ? (
                  <input
                    className="border-b-2 border-my-color-gray ml-2 pl-1 flex-1 font-[Pretendard-Light] w-4/5"
                    placeholder="수정 중..."
                    defaultValue={task.detail}
                    onChange={inputChange}
                  />
                ) : (
                  <span className="pl-3 rounded-lg flex-1 font-[Pretendard-Light]">
                    {/* 할 일 내용 */}
                    {task.detail}
                  </span>
                )}

                {isModify == task.tid ? (
                  <div className="flex">
                    <button
                      className="w-8 h-5 mx-2 bg-white rounded-xl border-2 border-black justify-center text-black text-xs font-[Pretendard-Regular] select-none"
                      onClick={() => taskModifyClicked(task.tid, task.detail)}
                    >
                      저장
                    </button>
                    <button
                      className="w-8 h-5 text-white rounded-xl justify-center bg-black text-xs font-[Pretendard-Regular] select-none"
                      onClick={() => setIsModify(-1)}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <></>
                )}
                {showThreeDot == task.tid ? (
                  // 점 3개 눌림 여부
                  <div className="flex items-center gap-2">
                    {/* 삭제 버튼 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      onClick={() =>
                        deleteTask({ tid: task.tid }).then(() => {
                          callbackFn({ type: 'refresh' });
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>

                    {/* 수정 버튼 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      onClick={() => (setIsModify(task.tid), setShowThreeDot(-1))}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    {/* 취소 버튼 */}
                    <button
                      className="w-8 h-5 text-white rounded-xl justify-center bg-black text-xs font-[Pretendard-Regular] select-none"
                      onClick={() => setShowThreeDot(-1)}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  //  점 3개
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="gray"
                    className={`size-6 ${isModify == task.tid ? 'hidden' : 'inline'}`}
                    onClick={() => setShowThreeDot(task.tid)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                )}
              </li>
            ))}
          </>
        ) : (
          <>
            {tasks.map((task) => (
              <li key={task.drId} className="flex justify-between py-1 mt-3">
                <div
                  className={`h-[23px] w-[23px] grid place-items-center rounded-lg ${
                    task.finished == true ? 'bg-black' : 'bg-my-color-gray'
                  }`}
                  onClick={() => routineFinishedClicked(task.drId)}
                >
                  {/* 완료 여부 검은 체크박스 / 회색 체크박스 */}
                  {task.finished == true ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="white"
                      className="size-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ) : (
                    <></>
                  )}
                </div>
                <span className="pl-3 rounded-lg flex-1 font-[Pretendard-Light]">
                    {/* 할 일 내용 */}
                    {task.detail}
                  </span>
                {showThreeDot == task.drId ? (
                  // 점 3개 눌림 여부
                  <div className="flex items-center gap-2">
                    {/* 삭제 버튼 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      onClick={() =>
                        deleteDailyRoutine({ drId: task.drId }).then(() => {
                          callbackFn({ type: 'refresh' });
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                    {/* 수정 버튼 */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                      onClick={() => (setIsModifyModalOpen(true), setShowThreeDot(-1), setDrId(task.drId))}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                    {/* 취소 버튼 */}
                    <button
                      className="w-8 h-5 text-white rounded-xl justify-center bg-black text-xs font-[Pretendard-Regular] select-none"
                      onClick={() => setShowThreeDot(-1)}
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  //  점 3개
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="gray"
                    className={`size-6 ${isModify == task.drId ? 'hidden' : 'inline'}`}
                    onClick={() => setShowThreeDot(task.drId)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                )}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default TasksSection;
