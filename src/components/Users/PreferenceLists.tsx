import { useNavigate } from "react-router-dom";
import { DocumentsType } from "../../hooks/useCollection";

const PreferenceLists = ({ data }: { data: DocumentsType }) => {
  const navigate = useNavigate();

  return (
    <li
      className="p-2 flex border border-solid border-blue-500 dark:border-orange-500 dark:text-white"
      key={data.id}
      onClick={() =>
        navigate(`/${data.contentType}/${data.contentId}/${data.contentTypeId}`)
      }
    >
      <img className="w-1/2 h-48 block" src={data.image} alt={data.title} />
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
