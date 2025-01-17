import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getRoutine, updateRoutine, deleteRoutine } from '../../api/TodomateApi';

const initState = {
  detail: '',
  startDate: '',
  endDate: '',
};

const RoutineModifyModal = ({ closeModal, callbackFn, drId }) => {
  const loginInfo = useSelector((state) => state.loginSlice);

  const [input, setInput] = useState({ ...initState });
  const [rid, setRid] = useState('');

  useEffect(() => {
    getRoutine({ mid: loginInfo.mid, drId: drId }).then((data) => {
      setInput({ ...data });
      setRid(data.rid);
    });
  }, []);

  const handleChange = (e) => {
    input[e.target.name] = e.target.value;
    setInput({ ...input });
  };

  const ModifyButtonClicked = () => {
    const startDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    const gap = (endDate - startDate) / (1000 * 3600 * 24) + 1;

    if (gap > 0) {
      updateRoutine({ rid: input.rid, routineDTO: input }).then((data) => {
        if (data === 'success') {
          closeModal();
          callbackFn({ type: 'refresh' });
        }
      });
    } else {
      alert('올바른 시작일과 종료일을 입력해주세요');
    }
  };

  const DeleteButtonClicked = () => {
    deleteRoutine({ rid: input.rid }).then((data) => {
      if (data === 'success') {
        closeModal();
        callbackFn({ type: 'refresh' });
      }
    })
  };

  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full grid place-items-center backdrop-blur-md "
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-950">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-200">
            <h3 className="text-lg font-['Pretendard-SemiBold'] text-gray-900 dark:text-white">루틴 수정하기</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white">
                  제목
                </label>
                <input
                  name="detail"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="새로운 루틴을 작성해주세요"
                  onChange={handleChange}
                  value={input.detail}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white">
                  루틴 시작일
                </label>
                <input
                  name="startDate"
                  type="date"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-600 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  value={input.startDate}
                ></input>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block mb-2 text-sm font-['Pretendard-Medium'] text-gray-900 dark:text-white">
                  루틴 종료일
                </label>
                <input
                  name="endDate"
                  type="date"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                  value={input.endDate}
                ></input>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 flex justify-center">
              <button
                type="button"
                className="text-black inline-flex items-center bg-gray-300 hover:bg-my-color-darkblue hover:text-white focus:ring-2 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Medium'] rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                onClick={ModifyButtonClicked}
              >
                수정 완료
              </button>
              <button
                type="button"
                className="text-black inline-flex items-center bg-gray-300 hover:bg-my-color-darkblue hover:text-white focus:ring-2 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Medium'] rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={DeleteButtonClicked}
              >
                전체 삭제
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoutineModifyModal;
