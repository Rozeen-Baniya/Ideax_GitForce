import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, Navigate } from "react-router-dom";
import { loginDriver } from "../store/authSlice";
import { verifyAuthDriver } from "../store/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorScreen, setErrorScreen] = useState("");

  useEffect(() => {
    const tokens = localStorage.getItem("token");
    if (!tokens) return;
    dispatch(verifyAuthDriver({ token: tokens }));
  }, [dispatch, token]);

  if (isAuthenticated) {
    return <Navigate to="/access/driver" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorScreen("");

    if (!licenseNumber.trim()) {
      setErrorScreen("Please enter a valid Driver's License Number.");
      return;
    }

    if (password.length < 3) {
      setErrorScreen("Password must be at least 3 characters long.");
      return;
    }

    dispatch(
      loginDriver({ driverLicenseNumber: licenseNumber, loginCode: password })
    )
      .unwrap()
      .then((res) => {
        localStorage.setItem("token", res.token);
        navigate("/access/driver");
      })
      .catch((err) => {
        setErrorScreen(err.message || "Something went wrong");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Sign in to access your dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="licenseNumber"
                className="block text-sm font-medium text-gray-300"
              >
                Driver's License Number
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                autoComplete="off"
                required
                className="w-full px-4 py-3 mt-1 text-white bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                placeholder="Enter your license number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 mt-1 text-white bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorScreen && (
            <div className="p-3 text-sm text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg">
              {errorScreen}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-semibold text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
