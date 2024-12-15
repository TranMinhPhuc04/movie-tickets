import React from "react";
import Seat from "./Seat";

const ListSeat = ({ listSeat, onSelectSeat, selectedSeats }) => {
  const groupedSeats = groupSeatsByRow(listSeat);

  return (
    <div className="seating-grid space-y-4">
      {Object.entries(groupSeatsByRow(listSeat)).map(([row, seats]) => (
        <div key={row} className="seat-row flex gap-2 justify-center">
          <span className="text-white font-semibold mr-4">Hàng {row}</span>
          {seats.map((seat) => (
            <Seat
              key={seat.maGhe}
              seat={seat}
              isSelected={selectedSeats.some((s) => s.maGhe === seat.maGhe)}
              onSelectSeat={onSelectSeat}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const groupSeatsByRow = (listSeat) => {
  const groupedSeats = {};

  listSeat.forEach((seat) => {
    // Tính hàng hiện tại dựa trên 16 ghế mỗi hàng
    const row = Math.ceil(seat.tenGhe / 16);

    if (!groupedSeats[row]) {
      groupedSeats[row] = [];
    }

    groupedSeats[row].push(seat);
  });

  // Sắp xếp ghế trong từng hàng theo thứ tự tăng dần
  Object.values(groupedSeats).forEach((rowSeats) => {
    rowSeats.sort((a, b) => a.tenGhe - b.tenGhe);
  });

  return groupedSeats;
};

export default ListSeat;
