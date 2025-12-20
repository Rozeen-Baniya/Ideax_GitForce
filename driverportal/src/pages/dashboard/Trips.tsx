import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTripByTransportId } from "../../store/transportSlice";

interface Trip {
  from: string;
  to: string;
  date: string;
  passenger: string;
  status: string;
  fare: string;
  startTime: string;
  endTime: string;
}

const Trips = () => {
  const { data, loading, error } = useAppSelector((state) => state.transport);
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchTripByTransportId(token));
    }
  }, [dispatch, token]);

  // Transform data if necessary, or assume data.trips matches the structure
  const trips: Trip[] = data?.trips || [];

  return (
    <div className="p-6 bg-[#0F172B] min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Trip History
        </h1>
        <p className="text-slate-400 mt-1">
          View your past journeys and details
        </p>
      </header>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700 font-medium">
            Error loading trips: {error}
          </p>
        </div>
      )}

      {!loading && !error && trips.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">No trips found.</p>
        </div>
      )}

      <div className="space-y-8">
        {Object.entries(
          trips.reduce((acc, trip) => {
            const date = trip.date;
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(trip);
            return acc;
          }, {} as Record<string, Trip[]>)
        ).map(([date, dateTrips]) => {
          const totalEarnings = dateTrips.reduce((sum, trip) => {
            const fareAmount = parseFloat(trip.fare.replace(/[^0-9.-]+/g, ""));
            return sum + (isNaN(fareAmount) ? 0 : fareAmount);
          }, 0);

          return (
            <div key={date}>
              <div className="flex justify-between items-end mb-4 pl-1 border-l-4 border-indigo-500">
                <h2 className="text-xl font-semibold text-white">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
                <span className="text-lg font-medium text-emerald-400">
                  Total: NPR {totalEarnings.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dateTrips.map((trip, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
                  >
                    {/* Decorative gradient blob */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col">
                          <div className="flex items-center space-x-2 text-gray-800">
                            <span className="font-bold text-lg">
                              {trip.from}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="font-bold text-lg">{trip.to}</span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            trip.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : trip.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span>
                              {trip.startTime} - {trip.endTime}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <span>{trip.passenger}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          Total Fare
                        </span>
                        <span className="text-xl font-bold text-indigo-600">
                          {trip.fare}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trips;
