import PreferenceLists from "../../components/Users/PreferenceLists";
import { useCollection } from "../../hooks/useCollection";
import SEOMeta from "../../SEOMeta";
import { useSelector } from "../../store/hooks";

const MyPreference = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { documents: likes } = useCollection("preference", authUser?.uid);

  return (
    <>
      <SEOMeta title={"나의 선호"} content={"내가 선호하는 여행지"} />
      <article>
        <ul className="space-y-10">
          {likes?.map((like) => (
            <PreferenceLists key={like.contentId} data={like} />
          ))}
        </ul>
        {likes && likes.length === 0 && (
          <div className="text-center">여행을 담아보세요</div>
        )}
      </article>
    </>
  );
};

export default MyPreference;
