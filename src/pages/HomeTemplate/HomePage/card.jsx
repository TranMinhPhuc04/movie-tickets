import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (maPhim) => {
    let urlDetail = ROUTES.MOVIE_DETAIL.replace(":id", maPhim);
    navigate(urlDetail);
  };

  return (
    <div
      key={movie.maPhim}
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
      onClick={() => handleNavigateToDetail(movie.maPhim)}
    >
      <img
        src={movie.hinhAnh}
        alt={movie.tenPhim}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{movie.tenPhim}</h3>
        <p className="text-gray-600 text-sm flex-grow">
          {movie.moTa.length > 100
            ? movie.moTa.slice(0, 100) + "..."
            : movie.moTa}
        </p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
};

export default Card;
