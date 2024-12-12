import React from "react";
import "./seat.scss";

export default function Seat({ seat, isSelected, onSelectSeat }) {
  const handleSelect = () => {
    if (!seat.daDat) {
      onSelectSeat(seat);
    }
  };

  return (
    <button
      onClick={handleSelect}
      className={`seat 
        ${seat.loaiGhe === "Vip" ? "seat__vip" : "seat__thuong"} 
        ${seat.daDat ? "seat__booked" : ""} 
        ${isSelected ? "seat__selected" : ""}
      `}
      disabled={seat.daDat}
    >
      {seat.tenGhe}
    </button>
  );
}
