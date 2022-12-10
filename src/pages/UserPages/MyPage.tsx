import { useSelector } from "../../store/hooks";

const MyPage = () => {
  const authUser = useSelector((state) => state.auth.user);

  return (
    <article className="p-2 flex">
      <div className="space-y-2 w-full flex flex-col justify-center items-center">
        <img src={"../images/noImage.jpg"} className="w-52 h-52 rounded-full" />
        <label
          htmlFor="user-image"
          className="py-2 w-1/2 text-center bg-blue-500 rounded-md text-white font-semibold cursor-pointer transition-colors dark:bg-orange-500"
        >
          업로드
          <input type="file" id="user-image" className="hidden" />
        </label>
      </div>
      <ul className="space-y-2 w-full flex flex-col justify-center text-xl font-semibold">
        <li>닉네임 : {authUser && authUser.displayName}</li>
        <li>이메일 : {authUser && authUser.email}</li>
      </ul>
      <ul></ul>
    </article>
  );
};

export default MyPage;
