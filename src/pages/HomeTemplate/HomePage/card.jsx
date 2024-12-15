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
      className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 max-w-xs md:max-w-sm lg:max-w-md"
      onClick={() => handleNavigateToDetail(movie.maPhim)}
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {movie.tenPhim}
        </h3>
        <p className="text-gray-600 text-sm mt-2 mb-4">
          {movie.moTa.length > 120
            ? `${movie.moTa.slice(0, 120)}...`
            : movie.moTa}
        </p>
        <button className="mt-auto w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
};

export default Card;
