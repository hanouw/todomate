import BasicLayout from '../layouts/BasicLayout';
import { Link } from 'react-router-dom';
import { getKakaoLoginLink } from "../api/kakaoApi";

const LoginPage = () => {

  const link = getKakaoLoginLink();

  return (
    <BasicLayout>
      <div className="font-[Pretendard-Bold] text-3xl grid place-items-center mt-36 mb-12">로그인</div>
      <div className="w-full sm:w-1/2 md:w-1/3 px-4 mx-auto flex justify-center items-center">
        <Link
          to={link}
          className="text-center w-full text-gray-900 flex justify-center items-center bg-yellow-300 font-['Pretendard-Regular'] rounded-sm text-sm px-5 py-2.5"
        >
          <div className="w-6 mr-2">
            <img
              src={process.env.PUBLIC_URL + "/assets/imgs/kakaoLogo.png"}
              alt="kakao"
            />
          </div>
          <span>카카오톡 로그인</span>
        </Link>
      </div>
    </BasicLayout>
  );
};

export default LoginPage;
