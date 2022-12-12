import { useCollection } from "../../hooks/useCollection";
import { useSelector } from "../../store/hooks";

const CampingPreference = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { documents: likes } = useCollection(
    "preference_camping",
    authUser?.uid,
  );

  console.log(likes);
  return (
    <div>
      {likes && likes.map((like) => <div key={like.id}>{like.title}</div>)}
    </div>
  );
};

export default CampingPreference;
