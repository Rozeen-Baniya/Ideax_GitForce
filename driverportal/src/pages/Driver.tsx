import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/access/request");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-white/10 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  TransitPay
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#"
                    className="bg-white/10 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Trips
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Earnings
                  </a>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Welcome Card */}
            <div className="col-span-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-lg">
              <h1 className="text-3xl font-bold text-white">
                Welcome back, Driver!
              </h1>
              <p className="mt-2 text-blue-100">
                Here's what's happening with your trips today.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-400">
                Total Earnings
              </h3>
              <p className="mt-2 text-3xl font-bold text-white">$1,245.00</p>
              <span className="text-sm text-green-400">
                +12% from last week
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-400">
                Completed Trips
              </h3>
              <p className="mt-2 text-3xl font-bold text-white">48</p>
              <span className="text-sm text-blue-400">8 trips today</span>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-sm font-medium text-gray-400">
                Driver Rating
              </h3>
              <p className="mt-2 text-3xl font-bold text-white">4.9</p>
              <span className="text-sm text-yellow-400">★★★★★</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Driver;
