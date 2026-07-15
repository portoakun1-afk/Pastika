import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">

      {/* ================= DESKTOP ================= */}

      <div
        className="d-none d-md-block shadow"
        style={{
          width: "260px",
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >

        {/* Header Mobile */}

        <div className="d-md-none bg-success text-white shadow-sm">

          <div className="d-flex justify-content-between align-items-center p-3">

            <h5 className="fw-bold mb-0">
              PASTIKA
            </h5>

            <button
              className="btn btn-light"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              ☰
            </button>

          </div>

        </div>

        <div className="p-3">
          {children}
        </div>

      </div>

      {/* ================= MOBILE SIDEBAR ================= */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
        style={{
          "--bs-offcanvas-width": "260px",
        }}
      >

        <div className="offcanvas-body p-0">

          <Sidebar />

        </div>

      </div>

    </div>
  );
}

export default Layout;