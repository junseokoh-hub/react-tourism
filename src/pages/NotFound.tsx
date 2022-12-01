import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <div className="h-screen flex flex-col justify-center items-center text-7xl font-bold text-white">
        Not Found!
      </div>
    </>
  );
};

export default NotFound;
