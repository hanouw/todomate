import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "../components/common/LoadingPage";

const Main = lazy(() => import("../pages/MainPage"));
const MyPage = lazy(() => import("../pages/MyPage"));
const Login = lazy(() => import("../pages/LoginPage"))
const Signup = lazy(() => import("../pages/SignupPage"))
const KakaoRedirect = lazy(() => import("../pages/KakaoRedirect"))
const NameAdd = lazy(() => import("../pages/NameAddPage"))

// 경로 매핑하는 곳 (root)
const Router = () => {
  return useRoutes([
    {
      path: "",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "/mypage",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/redirect",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "/name",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <NameAdd />
        </Suspense>
      ),
    },
  ]);
};

export default Router;
