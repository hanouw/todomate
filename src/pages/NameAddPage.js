import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import useCustomMove from '../hooks/useCustomMove';
import { nameAdd, nameIsduplicate } from '../api/memberApi';

const MyPage = () => {
  const { moveToMain } = useCustomMove();

  const inputClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]';

  const [nameVal, setNameVal] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginState = useSelector((state) => state.loginSlice);

  const checkDuplicate = async (name) => {
    nameIsduplicate(name).then((data) => {
      setIsDuplicate(data);
      if (data) {
        setErrorMessage('이미 사용중인 닉네임 입니다');
      } else {
        setErrorMessage('');
      }
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNameVal(value);
    if (value.trim()) {
      checkDuplicate(value);
    } else {
      setIsDuplicate(false);
      setErrorMessage('');
    }
  };

  const handleClick = () => {
    if (!nameVal.trim()) {
      alert('닉네임을 입력해주세요');
      return;
    }
    if (!isDuplicate) {
      nameAdd(nameVal, loginState.mid).then((data) => {
        if (data === 'success') {
          moveToMain();
        }
      });
    }
  };

  return (
    <>
      <header className="flex flex-col items-center">
        <div className="max-w-4xl w-full p-4 lg:p-6 border-b-2">
          <nav className="mx-auto flex items-center justify-between bg-white max-w-4xl w-full" aria-label="Global">
            <div className="flex items-center gap-2">
              <div className="text-xl font-[Pretendard-Bold] select-none cursor-pointer">todo mate</div>
            </div>
          </nav>
        </div>
      </header>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-44 mb-4">닉네임을 생성해주세요!</div>
      <div className="w-full grid place-items-center gap-5 mb-56">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <input
            name="name"
            type="text"
            className={`${inputClassName} ${isDuplicate ? 'border-red-500' : ''}`}
            value={nameVal}
            onChange={handleChange}
          />
          {isDuplicate && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10 justify-center items-center">
          <button
            className="bg-black text-white text-sm rounded-lg px-6 py-2 font-[Pretendard-Regular]"
            onClick={handleClick}
            disabled={isDuplicate}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
