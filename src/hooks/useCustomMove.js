import { useNavigate } from 'react-router-dom';

const useCustomMove = () => {
  const navigate = useNavigate();

  const moveToBack = () => {
    navigate(-1);
  };

  // 메인 페이지로 이동 : default 페이지로이동
  const moveToMain = () => {
    navigate({ pathname: '/' });
  };

  // 내 페이지로 이동
  const moveToMyPage = () => {
    navigate({ pathname: `/mypage` });
  };

  // 로그인 페이지로 이동
  const moveToLogin = () => {
    navigate({ pathname: `/login` });
  };

  const moveToSignup = () => {
    navigate({pathname: `/signup`})
  }

  return {
    moveToBack,
    moveToMain,
    moveToMyPage,
    moveToLogin,
    moveToSignup,
  };
};

export default useCustomMove;
