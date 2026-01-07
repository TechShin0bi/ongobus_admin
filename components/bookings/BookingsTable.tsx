import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Booking } from "@/types/booking";
import { useTranslations } from "next-intl";

interface BookingTableProps {
  bookings: Booking[];
  selectedIds: Set<string>;
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
}

export const BookingTable = ({ bookings, selectedIds, onToggleSelection, onToggleSelectAll }: BookingTableProps) => {
  
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed': return "bg-blue-50 text-blue-700 border border-blue-100";
      case 'Pending': return "bg-pink-50 text-pink-700 border border-pink-100";
      case 'Cancelled': return "bg-red-50 text-red-700 border border-red-100";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const allSelected = bookings.length > 0 && selectedIds.size === bookings.length;

  const t = useTranslations('bookings');

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{t('allBookings')}</h3>
        <p className="text-sm text-gray-500 mt-1">{t('manageBookings')}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                    checked={allSelected}
                    onChange={onToggleSelectAll}
                  />
                </div>
              </th>
              <th className="px-6 py-3 font-medium">{t('table.bookingId')}</th>
              <th className="px-6 py-3 font-medium">{t('table.passenger')}</th>
              <th className="px-6 py-3 font-medium">{t('table.route')}</th>
              <th className="px-6 py-3 font-medium">{t('table.travelDate')}</th>
              <th className="px-6 py-3 font-medium">{t('table.busNo')}</th>
              <th className="px-6 py-3 font-medium">{t('table.seats')}</th>
              <th className="px-6 py-3 font-medium">{t('table.agency')}</th>
              <th className="px-6 py-3 font-medium">{t('table.status')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr 
                key={booking.id} 
                className={clsx(
                  "bg-white hover:bg-gray-50 transition-colors",
                  selectedIds.has(booking.id) && "bg-indigo-50 hover:bg-indigo-50"
                )}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      checked={selectedIds.has(booking.id)}
                      onChange={() => onToggleSelection(booking.id)}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 text-gray-900">{booking.passengerName}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                      <span>{booking.routeFrom} -</span>
                      <span>{booking.routeTo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.travelDate}</td>
                <td className="px-6 py-4">{booking.busNo}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{booking.seats.join(', ')}</td>
                <td className="px-6 py-4">{booking.agency}</td>
                <td className="px-6 py-4">
                  <span className={clsx("px-2.5 py-1 rounded-full text-xs font-medium", getStatusBadge(booking.status))}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingPagination total={bookings.length} />
    </div>
  );
};

const BookingPagination = ({ total }: { total: number }) => {
  const t = useTranslations('bookings.pagination');
  
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
      <span className="text-sm text-gray-700">
        {t('showing')} <span className="font-semibold text-gray-900">5</span> {t('of')} <span className="font-semibold text-gray-900">{total}</span> {t('bookings')}.
      </span>
      <div className="inline-flex -space-x-px text-sm shadow-sm">
        <button className="flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
          <ChevronLeft className="w-4 h-4 mr-1" /> {t('previous')}
        </button>
        <button className="flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
          1
        </button>
        <button className="flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
          {t('next')} <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};