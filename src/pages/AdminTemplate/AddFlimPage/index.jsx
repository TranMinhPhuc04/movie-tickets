import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieService from "../../../services/movieService";
import ROUTES from "../../../constants/routes";
import { message } from "antd";
import dayjs from "dayjs";

const AddFilmPage = () => {
  const [form, setForm] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    sapChieu: false,
    dangChieu: false,
    hot: false,
    danhGia: "",
    hinhAnh: null,
  });

  const navigate = useNavigate();

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
      hinhAnh: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
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
    formData.append("File", form.hinhAnh);

    try {
      const response = await movieService.addFilm(formData);
      message.success("Thêm phim thành công!");
      console.log("Response:", response);

      console.log("Navigating to:", ROUTES.MOVIE); // Log xem đường dẫn
      navigate(ROUTES.MOVIE); // Chuyển hướng sau khi thêm thành công
    } catch (error) {
      console.error("Thêm phim thất bại:", error);
      message.error("Thêm phim thất bại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Thêm phim mới</h2>
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
          Thêm phim
        </button>
      </form>
    </div>
  );
};

export default AddFilmPage;
