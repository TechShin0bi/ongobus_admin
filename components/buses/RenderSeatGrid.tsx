import { Seat } from "@/types/buses";
import { RenderSeatBtn } from "./RenderSeatBtn";

interface RenderSeatGridProps {
  seats: Seat[];
}

const RenderSeatGrid = ({ seats }: RenderSeatGridProps) => {
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    const rowSeats = seats.slice(i, i + 4);
    rows.push(
      <div key={i} className="flex gap-4 justify-center mb-3">
        <div className="flex gap-2">
          {rowSeats.slice(0, 2).map((seat, idx) => (
            <RenderSeatBtn
              key={seat.id}
              seat={seat}
              realIndex={i + idx}
              onToggleSeat={() => {}}
            />
          ))}
        </div>
        <div className="w-8"></div>
        <div className="flex gap-2">
          {rowSeats.slice(2, 4).map((seat, idx) => (
            <RenderSeatBtn
              key={seat.id}
              seat={seat}
              realIndex={i + 2 + idx}
              onToggleSeat={() => {}}
            />
          ))}
        </div>
      </div>,
    );
  }
  return rows;
};

export default RenderSeatGrid;
