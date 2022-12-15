import { useLogout } from "../../hooks/useLogout";
import SEOMeta from "../../SEOMeta";
import ContactProfile from "../../components/Users/ContactProfile";
import DetailProfile from "../../components/Users/DetailProfile";
import { lazy, useEffect } from "react";

const ImageProfile = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, 2000)).then(
    () => import("../../components/Users/ImageProfile"),
  ),
);

const MyPage = () => {
  const { logout } = useLogout();

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <SEOMeta title={"내정보"} content={"나의 정보"} />
      <article className="p-2 space-y-10 dark:text-white">
        <ImageProfile />
        <ContactProfile />
        <DetailProfile />
        <span
          className="flex justify-end items-center cursor-pointer transition-colors hover:text-red-400"
          onClick={logout}
        >
          로그아웃
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </span>
      </article>
    </>
  );
};

export default MyPage;
