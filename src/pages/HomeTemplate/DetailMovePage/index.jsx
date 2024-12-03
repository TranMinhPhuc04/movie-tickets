import { useParams } from "react-router-dom";
import { fetchDetailMovie } from "./duck/reducer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DetailMoviePage() {
  const dispatch = useDispatch();
  const props = useSelector((state) => state.detailMovieReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailMovie(id));
  }, []);

  const renderDetailMovie = () => {
    // destructuring
    const { data } = props;

    if (data) {
      return (
        <div>
          <img src={data.hinhAnh} alt={data.tenPhim} />
          <h1>{data.tenPhim}</h1>
          <p>{data.moTa}</p>
        </div>
      );
    }
  };

  if (props.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>DetailMoviePage</h1>
      <div>{renderDetailMovie()}</div>
    </div>
  );
}
