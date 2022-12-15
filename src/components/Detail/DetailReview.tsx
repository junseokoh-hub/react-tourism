import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import { DetailCommonType } from "../../types/DetailType";

const DetailReview = () => {
  const { data: detailData } = useOutletContext<{ data: DetailCommonType }>();
  const { register, handleSubmit, setValue } = useForm();
  const authUser = useSelector((state) => state.auth.user);
  const { addDocument } = useFirestore("myReviews");
  const { documents } = useCollection("myReviews");
  const navigate = useNavigate();

  const reviews = useMemo(() => {
    const filteredData =
      documents &&
      detailData &&
      documents.filter((doc) => doc.contentId === detailData.contentid);
    filteredData &&
      filteredData.sort(
        (a, b) => b.createdTime.seconds - a.createdTime.seconds,
      );
    return filteredData;
  }, [documents]);

  const reviewSubmitHandler = handleSubmit((data) => {
    if (authUser) {
      if (!data.review) {
        alert(`글을 쓰셔야 됩니다!`);
        return;
      } else {
        addDocument({
          uid: authUser.uid,
          title: detailData?.title,
          contentId: detailData?.contentid,
          overview: data.review,
          author: authUser.displayName,
        });
      }
      setValue("review", "");
    } else {
      if (
        window.confirm(
          `로그인 하셔야 이용하실 수 있습니다. 로그인 하시겠습니까?`,
        )
      ) {
        navigate("/login");
      }
    }
  });

  return (
    <>
      <ul className="w-full max-h-[50vh] h-[50vh] shadow-md overflow-y-auto dark:shadow-[0px_0px_10px_rgba(255,255,255,0.8)]">
        {reviews && reviews.length === 0 && (
          <div className="text-center">리뷰를 작성해주세요!</div>
        )}
        {reviews &&
          reviews.map((doc) => (
            <li className="w-3/4" key={doc.id}>
              <h3>{doc.author}</h3>
              <p className="min-h-[50px]">{doc.overview}</p>
            </li>
          ))}
      </ul>
      <textarea className="w-full h-40 resize-none" {...register("review")} />
      <button
        onClick={reviewSubmitHandler}
        type="submit"
        className="py-2 w-full text-base cursor-pointer border-solid border-blue-500 bg-blue-500 text-white dark:bg-orange-500 dark:border-orange-500"
      >
        작성하기
      </button>
    </>
  );
};

export default DetailReview;
