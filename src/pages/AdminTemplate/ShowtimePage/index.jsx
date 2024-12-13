import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Select, DatePicker, Input, Button } from "antd";
import movieService from "../../../services/movieService";
import theaterService from "../../../services/theaterService";
import dayjs from "dayjs";

const ShowtimePage = () => {
  const { idFilm } = useParams(); // Lấy id phim từ URL
  const [movie, setMovie] = useState({});
  const [theaterSystems, setTheaterSystems] = useState([]); // Danh sách hệ thống rạp
  const [theaters, setTheaters] = useState([]); // Danh sách cụm rạp
  const [selectedTheaterSystem, setSelectedTheaterSystem] = useState(""); // Hệ thống rạp đã chọn
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
    if (!idFilm) {
      message.error("Không tìm thấy mã phim. Vui lòng kiểm tra lại!");
      return;
    }
    try {
      const res = await movieService.getMovieById(idFilm);
      if (!res.data.content) {
        throw new Error("Dữ liệu phim trống");
      }
      setMovie(res.data.content);
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
    setIsLoading(true); // Bắt đầu tải dữ liệu
    try {
      const res = await theaterService.getTheatersBySystem(maHeThongRap);
      setTheaters(res.data.content);
    } catch (err) {
      console.error("Lỗi khi tải cụm rạp:", err);
      message.error("Không thể tải danh sách cụm rạp!");
    } finally {
      setIsLoading(false); // Kết thúc tải dữ liệu
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
          {theaterSystems && theaterSystems.length > 0 ? (
            theaterSystems
              .filter((system) => system.maHeThongRap && system.tenHeThongRap) // Lọc phần tử hợp lệ
              .map((system) => (
                <Select.Option
                  key={`heThong_${system.maHeThongRap}`} // Đảm bảo key duy nhất với tiền tố
                  value={system.maHeThongRap}
                >
                  {system.tenHeThongRap}
                </Select.Option>
              ))
          ) : (
            <Select.Option key="loading" value="loading" disabled>
              Đang tải dữ liệu hệ thống rạp...
            </Select.Option>
          )}
        </Select>

        <Select
          placeholder="Chọn cụm rạp"
          onChange={(value) => setForm({ ...form, maRap: value })}
          className="w-full"
        >
          {theaters && theaters.length > 0 ? (
            theaters
              // .filter((theater) => theater.maRap && theater.tenCumRap) // Lọc phần tử hợp lệ
              .map((theater) => (
                <Select.Option
                  key={`cumRap_${theater.maRap}`} // Đảm bảo key duy nhất với tiền tố
                  value={theater.maRap}
                >
                  {theater.tenCumRap}
                </Select.Option>
              ))
          ) : (
            <Select.Option key="loading" value="loading" disabled>
              Đang tải dữ liệu...
            </Select.Option>
          )}
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
