import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div
      className="bg-success text-white p-3"
      style={{
        width: "260px",
        minHeight: "100vh",
      }}
    >
      <h3 className="fw-bold mb-4">PASTIKA</h3>

      <div className="mb-4">
        <small>Login sebagai</small>

        <h6 className="mb-0">{user?.nama}</h6>

        <small>{user?.seksi}</small>
      </div>

      <ul className="nav flex-column">

        {/* ================= ADMIN ================= */}

        {user?.role === "admin" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/admin">
                📝 Permintaan Belanja
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/barang">
                📦 Master Barang
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/riwayat-pengambilan">
                📋 Riwayat Pengambilan
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/cms">
                🖼 CMS
              </Link>
            </li>
          </>
        )}

        {/* ================= USER ================= */}

        {user?.role === "user" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/dashboard">
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/pengambilan">
                📦 Pengambilan Barang
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/request">
                📝 Permintaan Belanja
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/riwayat-pengambilan">
                📋 Riwayat Pengambilan
              </Link>
            </li>
          </>
        )}

        <li className="nav-item mt-4">
          <button
            className="btn btn-light w-100"
            onClick={logout}
          >
            Logout
          </button>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar; 