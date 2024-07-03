import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useCustomMove = () => {
  const navigate = useNavigate();

  const moveToBack = () => {
    navigate(-1);
  };

  // 메인 페이지로 이동 : default 페이지로이동
  const moveToMain = () => {
    navigate({ pathname: "/" });
  };

  // 내 페이지로 이동
  const moveToMyPage = () => {
    navigate({ pathname: `/mypage` });
  };

  return {
    moveToBack,
    moveToMain,
    moveToMyPage,
  };
};

export default useCustomMove;
