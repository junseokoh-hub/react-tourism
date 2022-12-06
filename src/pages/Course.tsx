import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { courseList } from "../api/routeApi";
import Loader from "../utils/Loader";

const Course = () => {
  const { routeIdx } = useParams();

  const { data: courses, isLoading } = useQuery([routeIdx], () =>
    courseList(routeIdx as string),
  );

  console.log(courses?.items.item);

  return (
    <div className="space-y-8 dark:text-white transition-colors">
      {isLoading ? (
        <Loader />
      ) : (
        courses?.items.item.map((course) => (
          <div className="space-y-4" key={course.crsIdx}>
            <h3>{course.crsKorNm}</h3>
            <p dangerouslySetInnerHTML={{ __html: course.crsContents }}></p>
            <p dangerouslySetInnerHTML={{ __html: course.crsTourInfo }}></p>
          </div>
        ))
      )}
    </div>
  );
};

export default Course;
