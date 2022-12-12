import { useLogout } from "../../hooks/useLogout";
import SEOMeta from "../../SEOMeta";
import ImageProfile from "../../components/Users/ImageProfile";
import DetailProfile from "../../components/Users/DetailProfile";

const MyPage = () => {
  const { logout } = useLogout();

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <SEOMeta title={"내정보"} content={"나의 정보"} />
      <article className="p-2 dark:text-white">
        <div>
          <ImageProfile />
          <DetailProfile />
        </div>
        <div className="mt-10">
          <span className="cursor-pointer" onClick={logout}>
            로그아웃
          </span>
        </div>
      </article>
    </>
  );
};

export default MyPage;
