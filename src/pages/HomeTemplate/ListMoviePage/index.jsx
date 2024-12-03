import { useEffect } from "react";
import Movie from "./movie";
import { fetchListMovie } from "./duck/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function ListMovie() {
  const dispatch = useDispatch();
  const props = useSelector((state) => state.listMovieReducer);

  useEffect(() => {
    dispatch(fetchListMovie());
  }, []);

  if (props.loading) return <p>Loading...</p>;

  const renderListMovies = () => {
    const { data } = props;
    if (data && data.length > 0) {
      return data.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
    }
  };

  return (
    <div>
      <h1>ListMovie</h1>
      <div className="grid grid-cols-4 gap-5">{renderListMovies()}</div>
    </div>
  );
}
