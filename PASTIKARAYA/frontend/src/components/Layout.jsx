import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">

        <div className="col-12 col-md-auto">
          <Sidebar />
        </div>

        <div
          className="col"
          style={{
            background: "#f4f6f9",
            minHeight: "100vh",
            padding: "20px",
          }}
        >
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;