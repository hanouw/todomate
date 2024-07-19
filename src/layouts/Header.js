import { useSelector } from "react-redux";
import useCustomLogin from "../hooks/useCustomLogin";
import useCustomMove from "../hooks/useCustomMove";
import { useEffect, useState } from "react";
import { friendRequest, searchFriends } from "../api/memberApi";

export default function Header() {
  const loginInfo = useSelector((state) => state.loginSlice);
  const { execLogout } = useCustomLogin();
  const { moveToMain, moveToMyPage } = useCustomMove();
  const [isClicked, setIsClicked] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const handleInputChange = (event) => {
    setInputVal(event.target.value);
    if (inputVal != "") {
      searchFriends({ mid: loginInfo.mid, startsWith: inputVal }).then(
        (data) => {
          setFilteredItems(data.RESULT);
          console.log(filteredItems);
        }
      );
    }
  };

  const handleItemClick = (item) => {
    alert("요청되었습니다.");
    friendRequest({ bymid: loginInfo.mid, tomid: item }).then((data) => {
      // 친구 클릭됨
      setIsClicked(false);
      setFilteredItems([]);
      console.log(data);
    });
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm("로그아웃 하시겠습니까?");
    if (isConfirmed) {
      execLogout();
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".item-container")) {
      setIsClicked(false);
      setFilteredItems([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <header className="flex flex-col items-center">
      <div className="max-w-4xl w-full p-4 lg:p-6 border-b-2">
        <nav
          className="mx-auto flex items-center justify-between bg-white max-w-4xl w-full"
          aria-label="Global"
        >
          <div className="flex items-center gap-2">
            <div
              className="text-xl font-[Pretendard-Bold] select-none cursor-pointer"
              onClick={moveToMain}
            >
              todo mate
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-x-6">
            {loginInfo.email ? (
              <>
                <div
                  className={`flex rounded-md text-sm transition-all duration-400 ease-in-out cursor-pointer item-container`}
                >
                  <input
                    className={`border-b w-auto transition-all duration-400 ease-in-out font-[Pretendard-Light] text-xs lg:text-sm select-none ${
                      isClicked ? "w-44 lg:w-64 mr-1 px-1" : "w-0"
                    }`}
                    placeholder="찾고자 하는 사용자의 닉네임을 작성해주세요"
                    onChange={handleInputChange}
                    value={inputVal}
                  />
                  {filteredItems.length > 0 && (
                    <ul className="absolute z-10 mt-6 w-44 lg:w-64 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                      {filteredItems.map((item, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleItemClick(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="lg:size-6 size-5 select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsClicked(!isClicked);
                      setFilteredItems([]);
                      setInputVal("");
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>

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
