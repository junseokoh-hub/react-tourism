import { useQuery } from "react-query";
import { imageList } from "../../api/campingApi";

type CampingImagesProps = {
  isMenuOpen: boolean;
  contentId: string;
};

const CampingImages = ({ isMenuOpen, contentId }: CampingImagesProps) => {
  const { data, isLoading } = useQuery(
    ["camping_images", contentId],
    () => imageList(contentId),
    {
      enabled: !!isMenuOpen,
    },
  );

  console.log(data);

  return <div></div>;
};

export default CampingImages;
