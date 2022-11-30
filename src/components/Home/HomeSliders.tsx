import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { basedList } from "../../api/campingApi";
import { courseList, routeList } from "../../api/routeApi";

const HomeSliders = () => {
  // const { data } = useQuery("courseList", courseList);
  // const { data } = useQuery("routeList", routeList);
  const { data } = useQuery("camping_basedList", basedList);

  console.log(data);

  return (
    <section className="pt-10 space-y-10">
      <Link
        to="camping"
        className="p-2 rounded-lg border border-solid hover:bg-teal-500 transition-colors"
      >
        go camping
      </Link>
      {/* {data?.items?.item.map((n: any) => (
        <div key={n.contentId}>
          <img src={n.firstImageUrl} alt={n.exprnProgrm} />
          <h4>{n.doNm}</h4>
        </div>
      ))} */}
      {/* {data?.items?.item.map((n: any) => (
        <div
          key={n.routeIdx}
          dangerouslySetInnerHTML={{ __html: n.themedescs }}
        ></div>
      ))} */}
      {/* {data?.items.item.map((n: any) => (
        <div dangerouslySetInnerHTML={{ __html: n.travelerinfo }} />
      ))} */}
    </section>
  );
};

export default HomeSliders;
