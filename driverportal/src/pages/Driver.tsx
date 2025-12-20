import { Link, Outlet, useNavigate } from "react-router-dom";

const Driver = () => {
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
                  <Link
                    to="/"
                    className="bg-white/10 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="trips"
                    className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Trips
                  </Link>
                  <Link
                    to="#"
                    className="text-gray-300 hover:bg-white/5 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Earnings
                  </Link>
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
        <Outlet />
      </main>
    </div>
  );
};

export default Driver;
