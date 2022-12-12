import React, { Suspense } from "react";
import { useMatch } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useSelector } from "../../store/hooks";
import Loader from "../../utils/Loader";

const TourismPreferenceLists = React.lazy(
  () => import("../../components/Users/TourismPreferenceLists"),
);
const CampingPreferenceLists = React.lazy(
  () => import("../../components/Users/CampingPreferenceLists"),
);

const MyPreferenceLists = () => {
  const authUser = useSelector((state) => state.auth.user);
  const tourismPreferenceMatch = useMatch("/myPreference/tourism");
  const { documents: tours } = useCollection("preference", authUser?.uid);
  const { documents: camps } = useCollection(
    "preference_camping",
    authUser?.uid,
  );

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <>
      <ul className="py-3 space-y-10">
        <Suspense fallback={<Loader />}>
          {tourismPreferenceMatch
            ? tours?.map((tour) => (
                <TourismPreferenceLists key={tour.id} data={tour} />
              ))
            : camps?.map((camp) => (
                <CampingPreferenceLists key={camp.id} data={camp} />
              ))}
          {tourismPreferenceMatch
            ? tours &&
              tours.length === 0 && (
                <div className="text-center dark:text-white">
                  여행을 담아보세요
                </div>
              )
            : camps &&
              camps.length === 0 && (
                <div className="text-center dark:text-white">
                  여행을 담아보세요
                </div>
              )}
        </Suspense>
      </ul>
    </>
  );
};

export default MyPreferenceLists;
