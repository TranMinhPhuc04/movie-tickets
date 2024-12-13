import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Select, DatePicker, Input, Button } from "antd";
import movieService from "../../../services/movieService";
import theaterService from "../../../services/theaterService";
import dayjs from "dayjs";

const ShowtimePage = () => {
  const { idFilm } = useParams();
  const [movie, setMovie] = useState({});
  const [theaterSystems, setTheaterSystems] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    maPhim: null,
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
      setMovie(res.data.content || {});
    } catch (err) {
      console.error("Lỗi khi tải thông tin phim:", err);
      message.error("Không thể tải thông tin phim!");
    }
  };

  const fetchTheaterSystems = async () => {
    try {
      const res = await theaterService.getTheaterSystems();
      setTheaterSystems(res.data.content || []);
    } catch (err) {
      console.error("Lỗi khi tải hệ thống rạp:", err);
      message.error("Không thể tải danh sách hệ thống rạp!");
    }
  };

  const fetchTheaters = async (maHeThongRap) => {
    setIsLoading(true);
    try {
      const res = await theaterService.getTheatersBySystem(maHeThongRap);
      const validTheaters = (res.data.content || []).map((theater) => ({
        ...theater,
        maRap: theater.maRap || `unknown_${Math.random()}`, // Thêm giá trị mặc định nếu thiếu
        tenCumRap: theater.tenCumRap || "Cụm rạp không xác định",
      }));
      console.log("Danh sách cụm rạp hợp lệ:", validTheaters); // Log danh sách cụm rạp hợp lệ
      setTheaters(validTheaters);
    } catch (err) {
      console.error("Lỗi khi tải cụm rạp:", err);
      message.error("Không thể tải danh sách cụm rạp!");
    } finally {
      setIsLoading(false);
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
      ngayChieuGioChieu: dayjs(date).format("DD/MM/YYYY HH:mm:ss"), // Định dạng dd/MM/yyyy hh:mm:ss
    });
  };

  const handleSubmit = async () => {
    const { maRap, ngayChieuGioChieu, giaVe } = form;

    if (!maRap || !ngayChieuGioChieu || !giaVe) {
      message.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const payload = {
      maPhim: Number(idFilm),
      maRap,
      ngayChieuGioChieu, // Đã định dạng đúng trong handleDateChange
      giaVe: Number(giaVe),
    };

    console.log("Payload gửi lên:", payload);

    try {
      await movieService.createShowtime(payload);
      message.success("Tạo lịch chiếu thành công!");
    } catch (err) {
      console.error("Tạo lịch chiếu thất bại:", err.response || err);
      const errorMsg =
        err.response?.data?.message ||
        "Không thể tạo lịch chiếu. Vui lòng kiểm tra lại!";
      message.error(errorMsg);
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
              key={`heThong_${system.maHeThongRap}`} // Đảm bảo key duy nhất
              value={system.maHeThongRap}
            >
              {system.tenHeThongRap || "Tên hệ thống không xác định"}
            </Select.Option>
          ))}
        </Select>

        <Select
          placeholder="Chọn cụm rạp"
          onChange={(value) => setForm({ ...form, maRap: value })}
          className="w-full"
        >
          {theaters.map((theater) => (
            <Select.Option
              key={`cumRap_${theater.maRap}`} // Đảm bảo key duy nhất
              value={theater.maRap}
            >
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
