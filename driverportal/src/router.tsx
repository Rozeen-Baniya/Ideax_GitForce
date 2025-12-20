import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./Login/main";
import Driver from "./pages/Driver";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Trips from "./pages/dashboard/Trips";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/access/request" replace />,
      },
      {
        path: "access/request",
        element: <Login />,
      },
      {
        path: "access/driver",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Driver />,
            children: [
              {
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <Dashboard />,
              },
              {
                path: "trips",
                element: <Trips />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
