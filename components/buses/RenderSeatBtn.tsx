import { Seat } from "@/types/buses";
import { X } from "lucide-react";
import clsx from "clsx";

export const RenderSeatBtn = ({ seat, realIndex, onToggleSeat }: { seat: Seat; realIndex: number; onToggleSeat: (index: number) => void }) => {
    let bgClass = "bg-gray-100 text-gray-600 hover:bg-gray-200";
    if (seat.status === 'premium') bgClass = "bg-pink-300 text-white hover:bg-pink-400";
    if (seat.status === 'occupied') bgClass = "bg-red-400 text-white hover:bg-red-500";

    return (
      <button
        key={seat.id}
        onClick={() => onToggleSeat(realIndex)}
        className={clsx(
          "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors",
          bgClass
        )}
      >
        {seat.status === 'occupied' ? <X size={16} /> : seat.number}
      </button>
    );
  };