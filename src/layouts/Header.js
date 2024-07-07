import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import { Link } from "react-router-dom";

export default function Header() {
  const loginInfo = useSelector((state) => state.loginSlice);
  const { execLogout } = useCustomLogin();

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
      alert("로그아웃 되었습니다.");
    }
  };
  return (
    <header className="flex flex-col items-center">
      <div className="max-w-4xl w-full p-4 lg:p-6 border-b-2">
        <nav
          className="mx-auto flex items-center justify-between bg-white max-w-4xl w-full"
          aria-label="Global"
        >
          <div className="flex items-center gap-2">
            <div className="text-xl font-[Pretendard-Bold] select-none">
              {loginInfo.name}
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
          {!loginInfo.name ? (
            <Link
              to="/login"
              className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
            >
              로그인
            </Link>
          ) : (
            <>
            <button
              onClick={handleLogout}
              className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
            >
              로그아웃
            </button>
            <button
              className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
            >
              마이페이지
            </button>
            </>
          )}
        </div>
        </nav>
      </div>
    </header>
  );
}
