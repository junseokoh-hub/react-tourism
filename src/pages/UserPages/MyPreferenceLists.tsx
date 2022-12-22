import React, { Suspense, useCallback, useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { useSelector } from "../../store/hooks";
import Loader from "../../utils/Loader.js";

const TourismPreferenceLists = React.lazy(
  () => import("../../components/Users/TourismPreferenceLists.js"),
);
const CampingPreferenceLists = React.lazy(
  () => import("../../components/Users/CampingPreferenceLists.js"),
);

const MyPreferenceLists = () => {
  const authUser = useSelector((state) => state.auth.user);
  const tourismPreferenceMatch = useMatch("/myPreference/tourism");
  const { deleteDocument } = useFirestore("preference_camping");
  const { documents: tours } = useCollection(
    "preference",
    authUser && ["uid", "==", authUser.uid],
  );
  const { documents: camps } = useCollection(
    "preference_camping",
    authUser && ["uid", "==", authUser.uid],
  );

  const deletePreference = useCallback((id: string) => {
    deleteDocument(id);
  }, []);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <ul className="py-3 space-y-10">
        <Suspense fallback={<Loader position={"top-0"} />}>
          {tourismPreferenceMatch
            ? tours?.map((tour) => (
                <TourismPreferenceLists key={tour.id} data={tour} />
              ))
            : camps?.map((camp) => (
                <CampingPreferenceLists
                  key={camp.id}
                  {...camp}
                  deletePreference={deletePreference}
                />
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
