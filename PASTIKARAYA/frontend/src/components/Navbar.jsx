import { Link } from "react-router-dom";
import logo from "../assets/logo-pastika.png";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow fixed-top">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center"
          href="#home"
        >
          <img
            src={logo}
            alt="Logo PASTIKA"
            width="70"
            height="70"
            className="me-3"
            style={{
              objectFit: "contain",
            }}
          />

          <div>
            <h5 className="mb-0 fw-bold">
              PASTIKA RAYA
            </h5>

            <small>
              Lapas Narkotika Kelas IIA Pematangsiantar
            </small>
          </div>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"  
          id="navbarMenu"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <a className="nav-link" href="#informasi">
                Informasi
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#layanan">
                Layanan
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#kegiatan">
                Kegiatan
              </a>
            </li>

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
              <Link
                to="/login"
                className="btn btn-success px-4"
              >
                <i className="bi bi-box-arrow-in-light me-2"></i>
                Masuk
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;