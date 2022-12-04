import { Helmet } from "react-helmet-async";

type SEOMetaProps = {
  title: string;
  content: string;
};

const SEOMeta = ({ title, content }: SEOMetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
  );
};

export default SEOMeta;
