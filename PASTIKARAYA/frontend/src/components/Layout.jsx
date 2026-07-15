import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">

      {/* Sidebar Desktop */}
      <div className="d-none d-md-block">
        <Sidebar />
      </div>

      {/* Konten */}
      <div
        className="flex-grow-1"
        style={{
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >

        {/* Navbar Mobile */}
        <div className="d-md-none bg-success text-white p-3 d-flex align-items-center justify-content-between shadow">
          <h5 className="mb-0 fw-bold">PASTIKA</h5>

          <button
            className="btn btn-light"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            ☰
          </button>
        </div>

        <div className="p-3">
          {children}
        </div>

      </div>

      {/* Sidebar Mobile */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

    </div>
  );
}

export default Layout;