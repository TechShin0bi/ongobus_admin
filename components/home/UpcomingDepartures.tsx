import clsx from "clsx";
import React from "react";

const UpcomingDepartures = () => {
  const UPCOMING_DEPARTURES = [
    {
      time: "08:00 AM",
      route: "New York - Boston Express",
      busId: "BUS-101",
      agency: "Global Travels",
      seats: 45,
      status: "On Time",
    },
    {
      time: "09:30 AM",
      route: "Los Angeles - San Francisco",
      busId: "BUS-205",
      agency: "CityLink Buses",
      seats: 32,
      status: "Delayed",
    },
    {
      time: "10:00 AM",
      route: "Chicago - Miami Coastal",
      busId: "BUS-310",
      agency: "Elite Transit",
      seats: 50,
      status: "On Time",
    },
    {
      time: "11:15 AM",
      route: "Houston - Dallas Shuttle",
      busId: "BUS-407",
      agency: "Starline Connect",
      seats: 28,
      status: "On Time",
    },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Upcoming Departures</h3>
        <p className="text-sm text-gray-500 mt-1">
          Real-time updates on scheduled bus departures.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Route</th>
              <th className="px-6 py-3">Bus ID</th>
              <th className="px-6 py-3">Agency</th>
              <th className="px-6 py-3">Seats</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {UPCOMING_DEPARTURES.map((row, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {row.time}
                </td>
                <td className="px-6 py-4">{row.route}</td>
                <td className="px-6 py-4">{row.busId}</td>
                <td className="px-6 py-4">{row.agency}</td>
                <td className="px-6 py-4">{row.seats}</td>
                <td className="px-6 py-4">
                  <span
                    className={clsx(
                      "px-2.5 py-0.5 rounded-full text-xs font-medium",
                      row.status === "On Time"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingDepartures;
