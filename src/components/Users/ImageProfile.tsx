import { updateProfile, User } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCallback, useState } from "react";
import { appAuth, storage } from "../../lib/firebaseConfig";
import { useDispatch, useSelector } from "../../store/hooks";
import { updateState } from "../../store/slices/authSlice";

const ImageProfile = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadImageHandler = useCallback(() => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `user_images/${authUser?.uid}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        updateProfile(appAuth.currentUser as User, {
          photoURL: url,
        })
          .then(() => {
            dispatch(updateState({ photoUrl: url }));
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  }, [imageUpload]);

  const changeImageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setImageUpload(e.target.files[0]);
      }
    },
    [],
  );

  return (
    <div className="space-y-2 w-full flex flex-col justify-center items-center">
      <img
        src={authUser?.photoURL || "../images/noImage.jpg"}
        className="w-52 h-52 rounded-full dark:shadow-[0px_5px_20px_rgba(255,255,255,0.4)]"
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
      <div
        className="py-2 w-1/2 text-center font-semibold rounded-md cursor-pointer border border-solid active:bg-blue-500 active:border-blue-500 dark:border-white dark:active:border-orange-500 dark:active:bg-orange-500"
        onClick={uploadImageHandler}
      >
        save
      </div>
    </div>
  );
};

export default ImageProfile;
