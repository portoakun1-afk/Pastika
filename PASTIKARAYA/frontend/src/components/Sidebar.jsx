import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Sidebar() {
  const { user, logout } = useAuth();

  const closeSidebar = () => {
    const sidebar = document.getElementById("mobileSidebar");

    if (sidebar && window.bootstrap) {
      const instance =
        window.bootstrap.Offcanvas.getInstance(sidebar);

      instance?.hide();
    }
  };

  return (
    <div
      className="bg-success text-white p-3 h-100"
      style={{
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
              <Link
                className="nav-link text-white"
                to="/admin"
                onClick={closeSidebar}
              >
                📝 Permintaan Belanja
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/barang"
                onClick={closeSidebar}
              >
                📦 Master Barang
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/riwayat-pengambilan"
                onClick={closeSidebar}
              >
                📋 Riwayat Pengambilan
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/cms"
                onClick={closeSidebar}
              >
                🖼 CMS
              </Link>
            </li>
          </>
        )}

        {/* ================= USER ================= */}

        {user?.role === "user" && (
          <>
            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/dashboard"
                onClick={closeSidebar}
              >
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/pengambilan"
                onClick={closeSidebar}
              >
                📦 Pengambilan Barang
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/request"
                onClick={closeSidebar}
              >
                📝 Permintaan Belanja
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white"
                to="/riwayat-pengambilan"
                onClick={closeSidebar}
              >
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