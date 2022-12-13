import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import { DetailCommonType } from "../../types/DetailType";

const DetailReview = () => {
  const { data: detailData } = useOutletContext<{ data: DetailCommonType }>();
  const { register, handleSubmit, reset } = useForm();
  const authUser = useSelector((state) => state.auth.user);
  const { addDocument } = useFirestore("tourism_reviews");
  const { documents } = useCollection(
    "tourism_reviews",
    authUser && "contentId",
    authUser && detailData.contentid,
  );
  const navigate = useNavigate();

  const reviewSubmitHandler = handleSubmit((data) => {
    if (authUser) {
      if (!data.review) {
        alert(`글을 쓰셔야 됩니다!`);
        return;
      } else {
        addDocument({
          uid: authUser.uid,
          contentId: detailData?.contentid,
          overview: data.review,
          author: authUser.displayName,
        });
        reset();
      }
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
      <ul>
        {documents &&
          documents.map((doc) => (
            <li key={doc.id}>
              <h3>{doc.author}</h3>
              <p>{doc.overview}</p>
            </li>
          ))}
      </ul>
      <textarea className="w-full h-40 resize-none" {...register("review")} />
      <button
        onClick={reviewSubmitHandler}
        type="submit"
        className="py-2 w-full text-base border-solid border-blue-500 bg-blue-500 text-white dark:bg-orange-500 dark:border-orange-500"
      >
        작성하기
      </button>
    </>
  );
};

export default DetailReview;
