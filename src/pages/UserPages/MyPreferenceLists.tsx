import React, { Fragment } from "react";
import { useMatch } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useSelector } from "../../store/hooks";

const TourismPreferenceLists = React.lazy(
  () => import("../../components/Users/TourismPreferenceLists"),
);
const CampingPreferenceLists = React.lazy(
  () => import("../../components/Users/CampingPreferenceLists"),
);

const MyPreferenceLists = () => {
  const authUser = useSelector((state) => state.auth.user);
  const tourismPreferenceMatch = useMatch("/myPreference/tourism");
  const { documents: likes } = useCollection(
    tourismPreferenceMatch ? "preference" : "preference_camping",
    authUser?.uid,
  );

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <ul className="py-3 space-y-10">
        {likes?.map((like) => (
          <Fragment key={like.contentId}>
            {tourismPreferenceMatch ? (
              <TourismPreferenceLists data={like} />
            ) : (
              <CampingPreferenceLists data={like} />
            )}
          </Fragment>
        ))}
      </ul>
      {likes && likes.length === 0 && (
        <div className="text-center dark:text-white">여행을 담아보세요</div>
      )}
    </>
  );
};

export default MyPreferenceLists;
