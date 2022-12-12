import TourismPreferenceLists from "../../components/Users/TourismPreferenceLists";
import { useCollection } from "../../hooks/useCollection";
import { useSelector } from "../../store/hooks";

const TourismPreference = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { documents: likes } = useCollection("preference", authUser?.uid);

  return (
    <>
      <ul className="py-3 space-y-10">
        {likes?.map((like) => (
          <TourismPreferenceLists key={like.contentId} data={like} />
        ))}
      </ul>
      {likes && likes.length === 0 && (
        <div className="text-center dark:text-white">여행을 담아보세요</div>
      )}
    </>
  );
};

export default TourismPreference;
