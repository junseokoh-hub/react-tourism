import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, appAuth } from "../../lib/firebaseConfig";
import React, { useCallback, useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import SEOMeta from "../../SEOMeta";
import { useDispatch, useSelector } from "../../store/hooks";
import { updateProfile, User } from "firebase/auth";
import { updateState } from "../../store/slices/authSlice";

const MyPage = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const { logout } = useLogout();
  console.log(authUser?.photoURL);

  const changeImageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImageUpload(e.target.files[0]);
      }
    },
    [],
  );

  const uploadImageHandler = useCallback(() => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `user_images/${authUser?.uid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(appAuth.currentUser as User, {
          photoURL: url,
        })
          .then(() => {
            dispatch(updateState(url));
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  }, [imageUpload]);

  return (
    <>
      <SEOMeta title={"내정보"} content={"나의 정보"} />
      <article className="p-2 flex dark:text-white">
        <div className="space-y-2 w-full flex flex-col justify-center items-center">
          <img
            src={authUser?.photoURL || "../images/noImage.jpg"}
            className="w-52 h-52 rounded-full"
          />
          <label
            htmlFor="user-image"
            className="py-2 w-1/2 text-center bg-blue-500 rounded-md text-white font-semibold cursor-pointer transition-colors dark:bg-orange-500"
          >
            업로드
            <input
              type="file"
              id="user-image"
              className="hidden"
              onChange={changeImageHandler}
            />
          </label>
          <div onClick={uploadImageHandler}>save</div>
        </div>
        <ul className="space-y-2 w-full flex flex-col justify-center text-xl font-semibold">
          <li>닉네임 : {authUser && authUser.displayName}</li>
          <li>이메일 : {authUser && authUser.email}</li>
        </ul>
        <span onClick={logout}>로그아웃</span>
      </article>
    </>
  );
};

export default MyPage;
