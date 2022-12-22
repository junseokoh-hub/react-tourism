import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import Loader from "../../utils/Loader.js";

const DetailProfile = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const authUser = useSelector((state) => state.auth.user);
  const { register, handleSubmit, setValue } = useForm();
  const { addDocument, updateDocument } = useFirestore("myProfile");
  const { documents } = useCollection(
    "myProfile",
    authUser && ["uid", "==", authUser.uid],
  );

  const submitProfileHandler = handleSubmit((data) => {
    const { address, favfood, hobby, sightseeing } = data;
    if (authUser && documents) {
      if (!documents[0]) {
        addDocument({
          uid: authUser.uid,
          addr: address,
          favfood,
          hobby,
          sightseeing,
        });
      } else {
        updateDocument(documents[0].id, {
          uid: authUser.uid,
          addr: address,
          favfood,
          hobby,
          sightseeing,
        });
      }
      setIsEditProfile(false);
    }
  });
  useEffect(() => {
    if (isEditProfile && documents) {
      if (documents[0]) {
        setValue("address", documents[0].addr);
        setValue("favfood", documents[0].favfood);
        setValue("hobby", documents[0].hobby);
        setValue("sightseeing", documents[0].sightseeing);
      }
    }
  }, [isEditProfile]);

  const [isPending, startTransition] = useTransition();

  return (
    <ul className="space-y-4">
      <li>
        <label htmlFor="address">주소 : </label>
        {isEditProfile ? (
          <input
            {...register("address")}
            className="border-0 border-solid border-b bg-transparent outline-none dark:text-white"
            id="address"
            type="text"
          />
        ) : (
          <span>{documents && documents[0] ? documents[0].addr : null}</span>
        )}
      </li>
      <li>
        <label htmlFor="favfood">좋아하는 음식 : </label>
        {isEditProfile ? (
          <input
            {...register("favfood")}
            className="border-0 border-solid border-b bg-transparent outline-none dark:text-white"
            id="favfood"
            type="text"
          />
        ) : (
          <span>{documents && documents[0] ? documents[0].favfood : null}</span>
        )}
      </li>
      <li>
        <label htmlFor="hobby">취미 : </label>
        {isEditProfile ? (
          <input
            {...register("hobby")}
            className="border-0 border-solid border-b bg-transparent outline-none dark:text-white"
            id="hobby"
            type="text"
          />
        ) : (
          <span>{documents && documents[0] ? documents[0].hobby : null}</span>
        )}
      </li>
      <li>
        <label htmlFor="sightseeing">가고 싶은 여행지 : </label>
        {isEditProfile ? (
          <input
            {...register("sightseeing")}
            className="border-0 border-solid border-b bg-transparent outline-none dark:text-white"
            id="sightseeing"
            type="text"
          />
        ) : (
          <span>
            {documents && documents[0] ? documents[0].sightseeing : null}
          </span>
        )}
      </li>
      <li className="space-x-3">
        {isEditProfile ? (
          isPending ? (
            <Loader position={"top-0"} />
          ) : (
            <>
              <button
                className="py-1 px-8 rounded-md transition-colors border border-solid border-blue-500 bg-transparent cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white dark:text-orange-500 dark:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                type="submit"
                onClick={submitProfileHandler}
              >
                저장
              </button>
              <button
                className="py-1 px-8 rounded-md transition-colors border border-solid border-blue-500 bg-transparent cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white dark:text-orange-500 dark:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                type="button"
                onClick={() =>
                  startTransition(() => {
                    setIsEditProfile(false);
                  })
                }
              >
                취소
              </button>
            </>
          )
        ) : (
          <button
            className="py-1 px-8 rounded-md transition-colors border border-solid border-blue-500 bg-transparent cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white dark:text-orange-500 dark:border-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
            type="button"
            onClick={() =>
              startTransition(() => {
                setIsEditProfile(true);
              })
            }
          >
            작성
          </button>
        )}
      </li>
    </ul>
  );
};

export default DetailProfile;
