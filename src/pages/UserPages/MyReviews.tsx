import { useQuery } from "react-query";
import { locationBasedList } from "../../api/campingApi";
import { useCollection } from "../../hooks/useCollection";
import SEOMeta from "../../SEOMeta";
import { useSelector } from "../../store/hooks";

const MyReviews = () => {
  const { data, isLoading } = useQuery("test", () =>
    locationBasedList(129.0536247, 35.6164276, "0"),
  );

  if (!isLoading) {
    console.log(data);
  }

  const authUser = useSelector((state) => state.auth.user);
  const { documents } = useCollection(
    "tourism_reviews",
    authUser && ["uid", "==", authUser.uid],
  );
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <>
      <SEOMeta title={"나의 리뷰"} content={"나의 리뷰 목록들"} />
      <article className="dark:text-white">
        <ul>
          {documents &&
            documents.map((doc) => (
              <li key={doc.createdTime + doc.contentId}>
                <h3>{doc.author}</h3>
                <p>{doc.overview}</p>
              </li>
            ))}
        </ul>
      </article>
    </>
  );
};

export default MyReviews;
