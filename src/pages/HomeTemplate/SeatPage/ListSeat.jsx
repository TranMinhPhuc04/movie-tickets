import React from "react";
import Seat from "./Seat";

const ListSeat = ({ listSeat, onSelectSeat, selectedSeats }) => {
  const groupedSeats = groupSeatsByRow(listSeat);

  return (
    <div className="seating-grid">
      {Object.entries(groupedSeats).map(([row, seats]) => (
        <div key={row} className="seat-row">
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
    const row = Math.ceil(seat.tenGhe / 10);
    if (!groupedSeats[row]) {
      groupedSeats[row] = [];
    }
    groupedSeats[row].push(seat);
  });
  return groupedSeats;
};

export default ListSeat;
