import { useParams } from "react-router-dom";
import movieService from "../../../services/movieService";
import { useEffect, useState } from "react";
import ListSeat from "./ListSeat";
import { Button, message } from "antd";

export default function SeatPage() {
  const { maLichChieu } = useParams();
  const [listSeat, setListSeat] = useState([]); // Danh sách ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const [loading, setLoading] = useState(true); // Trạng thái loading

  // Fetch danh sách ghế khi component mount
  useEffect(() => {
    setLoading(true);
    movieService
      .getMoviesSeatById(maLichChieu)
      .then((res) => setListSeat(res.data.content.danhSachGhe))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [maLichChieu]);

  // Xử lý chọn/bỏ chọn ghế
  const handleSelectSeat = (seat) => {
    setSelectedSeats(
      (prev) =>
        prev.some((s) => s.maGhe === seat.maGhe)
          ? prev.filter((s) => s.maGhe !== seat.maGhe) // Bỏ ghế
          : [...prev, seat] // Chọn ghế
    );
  };

  // Tính tổng tiền
  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.giaVe,
    0
  );

  // Xử lý đặt vé và reset ghế
  const handleBooking = () => {
    message.success("Đặt vé thành công!");
    setSelectedSeats([]); // Reset danh sách ghế đã chọn
  };

  if (loading) {
    return (
      <div className="main-container">
        <div className="loading-container">
          <h2>Đang tải dữ liệu ghế, vui lòng chờ...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container container mx-auto mt-[80px]">
      {/* Left Container */}
      <div className="left-container">
        <h1 className="title">Đặt vé xem phim</h1>
        <ListSeat
          listSeat={listSeat}
          onSelectSeat={handleSelectSeat}
          selectedSeats={selectedSeats}
        />
        <div className="legend">
          <div>
            <span className="seat seat__thuong"></span> Ghế thường
          </div>
          <div>
            <span className="seat seat__vip"></span> Ghế VIP
          </div>
          <div>
            <span className="seat seat__booked"></span> Ghế đã đặt
          </div>
          <div>
            <span className="seat seat__selected"></span> Ghế đang chọn
          </div>
        </div>
      </div>

      {/* Right Container */}
      <div className="right-container">
        <h2 className="title">Danh sách ghế đã chọn</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Ghế</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {selectedSeats.map((seat) => (
              <tr key={seat.maGhe}>
                <td>{seat.tenGhe}</td>
                <td>{seat.giaVe.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="text-right font-bold">
                Tổng tiền: {totalPrice.toLocaleString()} VNĐ
              </td>
            </tr>
          </tfoot>
        </table>
        {/* Nút Đặt Vé */}
        <div className="flex justify-center mt-6">
          <Button
            type="primary"
            onClick={handleBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition duration-300"
          >
            Đặt Vé
          </Button>
        </div>
      </div>
    </div>
  );
}
