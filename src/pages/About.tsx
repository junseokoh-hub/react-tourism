import { ItemType, searchStay } from "../api";
import { useQuery } from "react-query";

const About = () => {
  const { data, isLoading } = useQuery<ItemType[]>("searchStay", searchStay);

  return (
    <ul>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.length > 0 &&
        data.map((item) => (
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
