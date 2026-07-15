import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f6f9",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        {children}
      </div>

    </div>
  );
}

export default Layout;