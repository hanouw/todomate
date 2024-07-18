import { useDispatch, useSelector } from "react-redux";
import { loginPostAsync, logout } from "../slices/loginSlice";
import useCustomMove from "./useCustomMove";

const useCustomLogin = () => {
	const dispatch = useDispatch(); // 리덕스 state 값 변경해라~

	const { moveToLogin } = useCustomMove()

	// 로그인 상태 값 : 리덕스 지정한 슬라이스 state값 가져와라~
	const loginState = useSelector((state) => state.loginSlice);
	// 로그인 여부
	const isLogin = loginState.email ? true : false;

	// 로그인 함수
	const execLogin = async (loginParam) => {
		const action = await dispatch(loginPostAsync(loginParam));
		return action.payload;
	};

	// 로그아웃 함수
	const execLogout = async () => {
		dispatch(logout());
		moveToLogin()
	};

	return {
		loginState,
		isLogin,
		execLogin,
		execLogout,
	};
};

export default useCustomLogin;
