import BasicLayout from '../layouts/BasicLayout';
import { Link } from 'react-router-dom';
import { getKakaoLoginLink } from '../api/kakaoApi';
import useCustomLogin from '../hooks/useCustomLogin';
import { useState } from 'react';
import useCustomMove from '../hooks/useCustomMove';

const initState = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const link = getKakaoLoginLink();
  const { execLogin } = useCustomLogin();
  const { moveToNameAdd } = useCustomMove();

  const [loginParam, setLoginParam] = useState({ ...initState });
  const handleChange = (e) => {
    loginParam[e.target.name] = e.target.value;
    setLoginParam({ ...loginParam });
  };

  const handleClickLogin = () => {
    execLogin(loginParam).then((data) => {
      moveToNameAdd();
    });
  };

  const inputClassName =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5';
  const buttonClassName =
    "text-center w-full text-gray-900 inline-flex justify-center items-center bg-my-color-lightgreen hover:bg-my-color-superlightgreen border-black focus:ring-4 focus:outline-none focus:ring-my-color-lightgreen font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5";

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-36 mb-12">로그인</div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-4 mx-auto flex justify-center items-center">
        <Link
          to={link}
          className="text-center w-full text-gray-900 flex justify-center items-center bg-yellow-300 font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5"
        >
          <div className="w-6 mr-2">
            <img src={process.env.PUBLIC_URL + '/assets/imgs/kakaoLogo.png'} alt="kakao" />
          </div>
          <span>카카오톡 로그인</span>
        </Link>
      </div>
      {/* <div className="w-full sm:w-1/2 md:w-1/3 px-4">
        <span className="font-[Pretendard-Regular]">이메일 주소</span>
        <input
          name="email"
          type="email"
          value={loginParam.email}
          onChange={handleChange}
          className={inputClassName}
          placeholder="Befree@befree.com"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-4">
        <span className="font-[Pretendard-Regular]">비밀번호</span>
        <input
          name="password"
          type="password"
          value={loginParam.password}
          onChange={handleChange}
          className={inputClassName}
          placeholder="8자리 이상의 영문+숫자 조합을 입력해주세요"
          required
        />
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-4">
        <button className={buttonClassName} onClick={handleClickLogin}>
          로그인하기
        </button>
      </div> */}
    </BasicLayout>
  );
};

export default LoginPage;
