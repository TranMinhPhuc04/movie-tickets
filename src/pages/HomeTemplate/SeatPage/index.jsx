import { useParams } from "react-router-dom";
import movieService from "../../../services/movieService";
import { useEffect, useState } from "react";
import ListSeat from "./ListSeat";

export default function SeatPage() {
  const { maLichChieu } = useParams();
  const [listSeat, setListSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Trạng thái ghế đã chọn
  const [loading, setLoading] = useState(true); // Trạng thái loading

  useEffect(() => {
    setLoading(true); // Bắt đầu loading
    movieService
      .getMoviesSeatById(maLichChieu)
      .then((res) => {
        setListSeat(res.data.content.danhSachGhe);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false); // Kết thúc loading
      });
  }, [maLichChieu]);

  const handleSelectSeat = (seat) => {
    setSelectedSeats(
      (prev) =>
        prev.some((s) => s.maGhe === seat.maGhe)
          ? prev.filter((s) => s.maGhe !== seat.maGhe) // Bỏ chọn ghế nếu đã được chọn
          : [...prev, seat] // Thêm ghế vào danh sách nếu chưa được chọn
    );
  };

  const totalPrice = selectedSeats.reduce(
    (total, seat) => total + seat.giaVe,
    0
  );

  if (loading) {
    // Hiển thị giao diện loading
    return (
      <div className="main-container">
        <div className="loading-container">
          <h2>Đang tải dữ liệu ghế, vui lòng chờ...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
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
              <td colSpan="2">Tổng tiền: {totalPrice.toLocaleString()} VNĐ</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
