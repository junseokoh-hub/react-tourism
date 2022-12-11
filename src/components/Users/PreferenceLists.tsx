import { useNavigate } from "react-router-dom";
import { DocumentsType } from "../../hooks/useCollection";

const PreferenceLists = ({ data }: { data: DocumentsType }) => {
  const navigate = useNavigate();

  return (
    <li
      className="space-x-2 p-2 flex border border-solid border-blue-500 dark:border-orange-500 dark:text-white"
      key={data.id}
      onClick={() =>
        navigate(`/${data.contentType}/${data.contentId}/${data.contentTypeId}`)
      }
    >
      <div className="w-1/3 md:w-1/2">
        <img className="w-full h-60 block" src={data.image} alt={data.title} />
      </div>
      <div className="w-full">
        <h3>{data.title}</h3>
        <h5>{data.addr}</h5>
        <h5>{data.tel}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: `${data.overview.slice(0, 50)}...`,
          }}
        />
      </div>
    </li>
  );
};

export default PreferenceLists;
