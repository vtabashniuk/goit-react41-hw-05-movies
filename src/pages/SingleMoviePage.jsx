import { useParams } from "react-router-dom";

const SingleMoviePage = () => {

    const id = useParams();
    console.log(id);

  return (
    <>
      <h1>Single Movie Page</h1>
    </>
  );
};

export default SingleMoviePage