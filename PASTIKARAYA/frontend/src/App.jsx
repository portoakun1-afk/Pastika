import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./context/authContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";

import AdminDashboard from "./pages/dashboardAdmin";
import UserDashboard from "./pages/UserDashboard";

import CMS from "./pages/CMS";
import Barang from "./pages/barang";
import Request from "./pages/request";
import Pengambilan from "./pages/pengambilan";
import RiwayatPengambilan from "./pages/riwayatPengambilan";

import PrivateRoute from "./routes/PrivateRoute";

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              replace
            />
          ) : (
            <Login />
          )
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/cms"
        element={
          <PrivateRoute role="admin">
            <CMS />
          </PrivateRoute>
        }
      />

      <Route
        path="/barang"
        element={
          <PrivateRoute role="admin">
            <Barang />
          </PrivateRoute>
        }
      />

      {/* ================= USER ================= */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/request"
        element={
          <PrivateRoute>
            <Request />
          </PrivateRoute>
        }
      />

      <Route
        path="/pengambilan"
        element={
          <PrivateRoute>
            <Pengambilan />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/riwayat-pengambilan"
        element={
          <PrivateRoute role="admin">
            <RiwayatPengambilan />
          </PrivateRoute>
        }
      />

      <Route
        path="/riwayat-pengambilan"
        element={
          <PrivateRoute>
            <RiwayatPengambilan />
          </PrivateRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}
