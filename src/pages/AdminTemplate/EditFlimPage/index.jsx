import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieService from "../../../services/movieService";
import ROUTES from "../../../constants/routes";
import { message } from "antd";
import dayjs from "dayjs";

const EditFilmPage = () => {
  const { id } = useParams(); // Lấy `id` phim từ URL
  const [form, setForm] = useState({
    maPhim: 0, // Thêm `maPhim` vào form
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: "",
    hinhAnh: null, // File hình ảnh
  });
  const [existingImage, setExistingImage] = useState(""); // URL hình ảnh hiện tại
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const res = await movieService.getMovieById(id); // API lấy thông tin phim
        const movie = res.data.content;
        setForm({
          maPhim: movie.maPhim,
          tenPhim: movie.tenPhim,
          trailer: movie.trailer,
          moTa: movie.moTa,
          ngayKhoiChieu: dayjs(movie.ngayKhoiChieu).format("YYYY-MM-DD"),
          sapChieu: movie.sapChieu,
          dangChieu: movie.dangChieu,
          hot: movie.hot,
          danhGia: movie.danhGia,
          hinhAnh: null,
        });
        setExistingImage(movie.hinhAnh);
      } catch (err) {
        console.error("Lỗi khi tải thông tin phim:", err);
        message.error("Không thể tải thông tin phim!");
      }
    };

    fetchFilmDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      hinhAnh: e.target.files[0], // Cập nhật file hình ảnh mới
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("maPhim", form.maPhim); // Bắt buộc phải có `maPhim`
    formData.append("tenPhim", form.tenPhim);
    formData.append("trailer", form.trailer);
    formData.append("moTa", form.moTa);
    formData.append("maNhom", "GP01");
    formData.append(
      "ngayKhoiChieu",
      dayjs(form.ngayKhoiChieu).format("DD/MM/YYYY")
    );
    formData.append("sapChieu", form.sapChieu);
    formData.append("dangChieu", form.dangChieu);
    formData.append("hot", form.hot);
    formData.append("danhGia", form.danhGia);
    if (form.hinhAnh) {
      formData.append("File", form.hinhAnh); // Nếu có file mới thì gửi
    }

    try {
      await movieService.updateFilm(formData); // Gọi API cập nhật phim
      message.success("Cập nhật phim thành công!");
      navigate(ROUTES.MOVIE); // Điều hướng về danh sách phim
    } catch (error) {
      console.error("Cập nhật phim thất bại:", error);
      message.error("Cập nhật phim thất bại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa phim</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <input
            type="text"
            name="tenPhim"
            value={form.tenPhim}
            onChange={handleInputChange}
            placeholder="Tên phim"
            className="border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="trailer"
            value={form.trailer}
            onChange={handleInputChange}
            placeholder="Trailer"
            className="border px-4 py-2 rounded"
          />
          <textarea
            name="moTa"
            value={form.moTa}
            onChange={handleInputChange}
            placeholder="Mô tả"
            className="border px-4 py-2 rounded"
          />
          <input
            type="date"
            name="ngayKhoiChieu"
            value={form.ngayKhoiChieu}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded"
          />
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                name="sapChieu"
                checked={form.sapChieu}
                onChange={handleInputChange}
              />
              Sắp chiếu
            </label>
            <label>
              <input
                type="checkbox"
                name="dangChieu"
                checked={form.dangChieu}
                onChange={handleInputChange}
              />
              Đang chiếu
            </label>
            <label>
              <input
                type="checkbox"
                name="hot"
                checked={form.hot}
                onChange={handleInputChange}
              />
              Hot
            </label>
          </div>
          <input
            type="number"
            name="danhGia"
            value={form.danhGia}
            onChange={handleInputChange}
            placeholder="Số sao (1-10)"
            className="border px-4 py-2 rounded"
          />
          {existingImage && (
            <div>
              <p>Hình ảnh hiện tại:</p>
              <img
                src={existingImage}
                alt="Hình ảnh hiện tại"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cập nhật phim
        </button>
      </form>
    </div>
  );
};

export default EditFilmPage;