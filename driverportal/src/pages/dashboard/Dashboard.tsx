const Dashboard = () => {
  return (
    <>
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
            <span className="text-sm text-green-400">+12% from last week</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-gray-400">
              Completed Trips
            </h3>
            <p className="mt-2 text-3xl font-bold text-white">48</p>
            <span className="text-sm text-blue-400">8 trips today</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-gray-400">Driver Rating</h3>
            <p className="mt-2 text-3xl font-bold text-white">4.9</p>
            <span className="text-sm text-yellow-400">★★★★★</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
