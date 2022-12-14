import { useCallback, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import SEOMeta from "../../SEOMeta";
import { useSelector } from "../../store/hooks";

const MyReviews = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { deleteDocument } = useFirestore("myReviews");
  const { documents } = useCollection(
    "myReviews",
    authUser && ["uid", "==", authUser.uid],
  );

  const createdTime = () => {
    if (documents) {
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const miliseconds = documents[0].createdTime.seconds * 1000;
      const data = new Date(miliseconds);
      const year = data.getFullYear();
      const month = data.getMonth() + 1;
      const date = data.getDate();
      const day = days[data.getDay()];

      return `${year}년 ${month}월 ${date}일 ${day}요일`;
    }
  };

  const deleteMyReview = useCallback(() => {
    if (documents) {
      deleteDocument(documents[0].id);
    }
  }, [documents]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);
  return (
    <>
      <SEOMeta title={"나의 리뷰"} content={"나의 리뷰 목록들"} />
      <article className="dark:text-white">
        <ul className="space-y-3">
          {documents &&
            documents.map((doc) => (
              <li
                className="px-3 py-2 space-y-3 min-h-20 flex flex-col justify-around border border-dashed border-blue-500 rounded-md dark:border-orange-500"
                key={doc.createdTime + doc.contentId}
              >
                <h3>{doc.title}</h3>
                <div className="space-y-3 flex flex-col">
                  <p>{doc.overview}</p>
                  <span>{createdTime()}</span>
                  <button
                    onClick={deleteMyReview}
                    type="button"
                    className="py-2 w-1/5 bg-transparent rounded-md cursor-pointer transition-colors border border-solid border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-500 dark:hover:text-white"
                  >
                    제거
                  </button>
                </div>
              </li>
            ))}
          {documents && documents.length === 0 && (
            <div className="mt-5 text-center">리뷰를 작성해 보세요</div>
          )}
        </ul>
      </article>
    </>
  );
};

export default MyReviews;
