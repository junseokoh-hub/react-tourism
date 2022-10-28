import { searchStay } from "../api";
import { useQuery } from "react-query";

const About = () => {
  const { data, isLoading } = useQuery("searchStay", searchStay);

  const stay = data?.response?.body?.items?.item;

  console.log(stay);

  return (
    <ul>
      {stay &&
        stay.length > 0 &&
        stay.map((item: any) => (
          <li key={item.contentid}>
            {item.firstimage || item.firstimage2 ? (
              <img
                src={item.firstimage || item.firstimage2}
                className="w-96 h-96 block"
              />
            ) : null}
          </li>
        ))}
    </ul>
  );
};

export default About;
