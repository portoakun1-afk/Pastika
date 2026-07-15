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
              Lapas Narkotika Kelas IIA Pematangsiantarrrrrrrrr
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
          <ul className="navbar-nav ms-auto">

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

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;