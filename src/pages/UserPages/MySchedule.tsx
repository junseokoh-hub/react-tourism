import DetailTable from "../../components/Detail/AccommodationDetailTable";
import SEOMeta from "../../SEOMeta";

const MySchedule = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  return (
    <>
      <SEOMeta title={"나의 여정"} content={"나의 여행 여정"} />
      <article>
        <DetailTable />
      </article>
    </>
  );
};

export default MySchedule;
