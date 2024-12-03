import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={movie.hinhAnh} alt="" />

      <div className="p-5">
        <Link to={`/detail-movie/${movie.maPhim}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.tenPhim}
          </h5>
        </Link>
      </div>
    </div>
  );
}
