import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../../../services/movieService";
import ROUTES from "../../../constants/routes";
import { message } from "antd";

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const res = await movieService.getFilmList();
      setFilms(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải danh sách phim:", err);
      message.error("Không thể tải danh sách phim!");
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddFilm = () => {
    navigate(ROUTES.ADD_MOVIE); // Điều hướng đến trang thêm phim
  };

  const handleDeleteFilm = async (filmId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        await movieService.deleteFilm(filmId);
        message.success("Xóa phim thành công!");
        fetchFilms(); // Cập nhật lại danh sách phim sau khi xóa
      } catch (error) {
        console.error("Xóa phim thất bại:", error);
        message.error("Không thể xóa phim!");
      }
    }
  };

  const handleEditFilm = (filmId) => {
    navigate(`${ROUTES.EDIT_MOVIE}/${filmId}`);
  };

  const filteredFilms = films.filter((film) =>
    film.tenPhim.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Quản lý Phim</h2>
        <button
          onClick={handleAddFilm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm phim
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Tìm kiếm phim..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <table className="w-full border border-gray-300 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Mã phim</th>
            <th className="px-4 py-2 border border-gray-300">Hình ảnh</th>
            <th className="px-4 py-2 border border-gray-300">Tên phim</th>
            <th className="px-4 py-2 border border-gray-300">Mô tả</th>
            <th className="px-4 py-2 border border-gray-300">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredFilms.map((film) => (
            <tr key={film.maPhim} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                {film.maPhim}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <img
                  src={film.hinhAnh}
                  alt={film.tenPhim}
                  className="w-14 h-14 object-cover rounded-md shadow"
                />
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {film.tenPhim}
              </td>
              <td className="px-4 py-2 border border-gray-300 truncate max-w-xs">
                {film.moTa}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleEditFilm(film.maPhim)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteFilm(film.maPhim)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilmsPage;
