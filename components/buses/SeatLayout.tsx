import { useTranslations } from 'next-intl';
import { X, RotateCcw, Save } from 'lucide-react';
import clsx from 'clsx';
import { Seat } from '@/types/buses';

interface SeatLayoutProps {
  seats: Seat[];
  onToggleSeat: (index: number) => void;
  onReset: () => void;
}

export const SeatLayout = ({ seats, onToggleSeat, onReset }: SeatLayoutProps) => {
  const t = useTranslations('Buses.seatLayout');
  const renderSeatBtn = (seat: Seat, realIndex: number) => {
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

  const renderSeatGrid = () => {
    const rows = [];
    for (let i = 0; i < seats.length; i += 4) {
      const rowSeats = seats.slice(i, i + 4);
      rows.push(
        <div key={i} className="flex gap-4 justify-center mb-3">
          <div className="flex gap-2">
            {rowSeats.slice(0, 2).map((seat, idx) => renderSeatBtn(seat, i + idx))}
          </div>
          <div className="w-8"></div>
          <div className="flex gap-2">
            {rowSeats.slice(2, 4).map((seat, idx) => renderSeatBtn(seat, i + 2 + idx))}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">{t('title')}</h2>
        <p className="text-sm text-gray-500">{t('description')}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 flex flex-col items-center">
        <div className="w-64 h-8 bg-gray-200 rounded-t-3xl mb-6 flex items-center justify-center text-xs text-gray-500 uppercase tracking-widest">
          {t('front')}
        </div>

        <div className="w-full max-w-sm">
          {renderSeatGrid()}
        </div>
        
        <div className="flex items-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded border border-gray-200"></div>
            <span className="text-sm text-gray-600">{t('legend.standard')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-300 rounded"></div>
            <span className="text-sm text-gray-600">{t('legend.premium')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded flex items-center justify-center">
              <X size={10} className="text-white" />
            </div>
            <span className="text-sm text-gray-600">{t('legend.occupied')}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button 
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw size={16} /> {t('reset')}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
          <Save size={16} /> {t('update')}
        </button>
      </div>
    </div>
  );
};