import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useSelector } from "../../store/hooks";

const MyPreference = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { documents } = useCollection("preference");
  const likes = documents?.filter((doc) => doc.uid === authUser?.uid);
  const navigate = useNavigate();
  console.log(likes);

  return (
    <article>
      <ul>
        {likes?.map((like) => (
          <li
            className="p-2 flex border border-solid border-blue-500 dark:border-orange-500 dark:text-white"
            key={like.id}
          >
            <img
              className="w-1/3 h-50 block"
              src={like.image}
              alt={like.title}
            />
            <div>
              <h3>{like.title}</h3>
              <h5>{like.addr}</h5>
              <h5>{like.tel}</h5>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${like.overview.slice(0, 50)}...`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      {likes && likes.length === 0 && (
        <div className="text-center">여행을 담아보세요</div>
      )}
    </article>
  );
};

export default MyPreference;
