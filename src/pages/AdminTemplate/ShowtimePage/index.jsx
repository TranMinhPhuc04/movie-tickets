import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Select, DatePicker, Input, Button } from "antd";
import movieService from "../../../services/movieService";
import theaterService from "../../../services/theaterService";
import dayjs from "dayjs";

const ShowtimePage = () => {
  const { idFilm } = useParams();
  console.log("idFilm từ useParams:", idFilm);
  const [movie, setMovie] = useState({});
  const [theaterSystems, setTheaterSystems] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState("");
  const [form, setForm] = useState({
    maRap: "",
    ngayChieuGioChieu: "",
    giaVe: "",
  });

  useEffect(() => {
    if (idFilm) {
      fetchMovieDetails(idFilm);
    }
    fetchTheaterSystems();
  }, [idFilm]);

  const fetchMovieDetails = async (idFilm) => {
    try {
      const res = await movieService.getMovieById(idFilm);
      setMovie(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải thông tin phim:", err);
      message.error("Không thể tải thông tin phim!");
    }
  };

  const fetchTheaterSystems = async () => {
    try {
      const res = await theaterService.getTheaterSystems();
      setTheaterSystems(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải hệ thống rạp:", err);
      message.error("Không thể tải danh sách hệ thống rạp!");
    }
  };

  const fetchTheaters = async (maHeThongRap) => {
    try {
      const res = await theaterService.getTheatersBySystem(maHeThongRap);
      setTheaters(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải cụm rạp:", err);
      message.error("Không thể tải danh sách cụm rạp!");
    }
  };

  const handleTheaterSystemChange = (value) => {
    setSelectedTheaterSystem(value);
    fetchTheaters(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (date) => {
    setForm({
      ...form,
      ngayChieuGioChieu: dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    });
  };

  const handleSubmit = async () => {
    if (!form.maRap || !form.ngayChieuGioChieu || !form.giaVe) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const payload = { maPhim: idFilm, ...form };

    try {
      await movieService.createShowtime(payload);
      message.success("Tạo lịch chiếu thành công!");
    } catch (err) {
      console.error("Tạo lịch chiếu thất bại:", err);
      message.error("Không thể tạo lịch chiếu. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Tạo lịch chiếu - {movie.tenPhim || "Đang tải..."}
      </h2>
      <img
        src={movie.hinhAnh || "/placeholder-image.png"}
        alt={movie.tenPhim || "Phim"}
        className="w-40 mb-4 rounded-md"
      />
      <div className="grid grid-cols-1 gap-4">
        <Select
          placeholder="Chọn hệ thống rạp"
          onChange={handleTheaterSystemChange}
          className="w-full"
        >
          {theaterSystems.map((system) => (
            <Select.Option
              key={system.maHeThongRap}
              value={system.maHeThongRap}
            >
              {system.tenHeThongRap}
            </Select.Option>
          ))}
        </Select>
        <Select
          placeholder="Chọn cụm rạp"
          onChange={(value) => setForm({ ...form, maRap: value })}
          className="w-full"
        >
          {theaters.map((theater) => (
            <Select.Option key={theater.maRap} value={theater.maRap}>
              {theater.tenCumRap}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          showTime
          placeholder="Chọn ngày chiếu"
          value={
            form.ngayChieuGioChieu
              ? dayjs(form.ngayChieuGioChieu, "DD/MM/YYYY HH:mm:ss")
              : null
          }
          onChange={handleDateChange}
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Giá vé"
          name="giaVe"
          value={form.giaVe}
          onChange={handleInputChange}
          className="w-full"
        />
        <Button
          type="primary"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tạo lịch chiếu
        </Button>
      </div>
    </div>
  );
};

export default ShowtimePage;
