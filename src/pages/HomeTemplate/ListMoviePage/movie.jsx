import { Link } from "react-router-dom";

export default function Movie(props) {
  const { movie } = props;

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Link to={`/detail-movie/${movie.maPhim}`}>
        {/* Hình ảnh phim */}
        <img
          className="w-full h-64 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
      </Link>

      {/* Nội dung */}
      <div className="p-5">
        <Link to={`/detail-movie/${movie.maPhim}`}>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800 dark:text-white hover:text-blue-600 transition-colors">
            {movie.tenPhim}
          </h5>
        </Link>
        <p className="text-gray-500 dark:text-gray-400">
          Ngày chiếu:{" "}
          <span className="font-semibold">{movie.ngayKhoiChieu}</span>
        </p>
      </div>

      {/* Nút xem chi tiết */}
      <div className="p-4 flex justify-center">
        <Link
          to={`/detail-movie/${movie.maPhim}`}
          className="inline-block bg-blue-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Xem Chi Tiết
        </Link>
      </div>
    </div>
  );
}
