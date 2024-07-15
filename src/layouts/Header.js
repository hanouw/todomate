import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";

export default function Header() {
  const loginInfo = useSelector((state) => state.loginSlice);
  const { execLogout } = useCustomLogin();
  const { moveToMyPage } = useCustomMove()

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
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
            {loginInfo.name ? (
              <div className="text-xl font-[Pretendard-Bold] select-none">
                {loginInfo.name}
              </div>
            ) : (
              <div className="text-xl font-[Pretendard-Bold] select-none">
                todo mate
              </div>
            )}
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {loginInfo.name ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
                >
                  로그아웃
                </button>
                <button
                  className="hidden lg:block lg:text-base font-['Pretendard-SemiBold'] lg:leading-6 lg:text-gray-900"
                  onClick={() => moveToMyPage()}
                >
                  마이페이지
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
