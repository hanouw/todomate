import React, { useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import useCustomMove from "../hooks/useCustomMove";
import useCustomLogin from "../hooks/useCustomLogin";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { moveToLogin } = useCustomMove();
  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 font-[Pretendard-Regular]";

  const { isLogin } = useCustomLogin();
  const loginState = useSelector((state) => state.loginSlice);
  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다!")
      moveToLogin();
    }
  }, []);
  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-44 mb-12">
        내 정보
      </div>
      <div className="w-full grid place-items-center gap-5 mb-56">
        <div className="w-full sm:w-1/2 md:w-1/3 px-4">
          <span className="font-[Pretendard-Regular]">이메일 주소</span>
          <input
            id="email"
            name="email"
            type="email"
            className={inputClassName}
            value={loginState.email}
            disabled
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 px-4 flex gap-10 justify-center items-center">
          <button
            className="bg-black text-white text-sm rounded-lg px-6 py-2 font-[Pretendard-Regular]"
          >
            회원 탈퇴
          </button>
          <button
            className="bg-black text-white text-sm rounded-lg px-6 py-2 font-[Pretendard-Regular]"
          >
            비밀번호 변경
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export default MyPage;
