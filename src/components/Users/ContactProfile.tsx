import { updateProfile, User } from "firebase/auth";
import { useCallback, useRef, useState } from "react";
import { appAuth } from "../../lib/firebaseConfig";
import { useDispatch, useSelector } from "../../store/hooks";
import { updateState } from "../../store/slices/authSlice";

const ContactProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const authUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const updateDisplayNameHandler = useCallback(() => {
    updateProfile(appAuth.currentUser as User, {
      displayName: inputRef.current?.value,
    })
      .then(() => {
        dispatch(updateState({ displayName: inputRef.current?.value }));
        setIsEdit(false);
      })
      .catch((err) => {
        alert(`${err.message}`);
      });
  }, []);

  return (
    <ul className="mt-5 space-y-2 w-full flex flex-col justify-center text-xl font-semibold">
      {!isEdit ? (
        <li onDoubleClick={() => setIsEdit(true)}>
          닉네임 : {authUser && authUser.displayName}
        </li>
      ) : (
        <li className="flex items-center space-x-3">
          <input type="text" ref={inputRef} />
          <span onClick={updateDisplayNameHandler}>수정</span>
          <span onClick={() => setIsEdit(false)}>취소</span>
        </li>
      )}
      <li>이메일 : {authUser && authUser.email}</li>
    </ul>
  );
};

export default ContactProfile;
