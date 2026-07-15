import { useEffect, useState } from "react";
import API from "../api/api";

function Home() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const res = await API.get("/cms");
      setContents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const banner = contents.find((item) => item.section === "banner");
  const informasi = contents.filter((item) => item.section === "informasi");
  const layanan = contents.filter((item) => item.section === "layanan");
  const kegiatan = contents.filter((item) => item.section === "kegiatan");

  return (
    <div>
      {/* ================= BANNER ================= */}

      {banner && (
        <section className="position-relative" id="home">
          <img
            src={banner.images[0]}
            className="w-100"
            style={{
              height: "90vh",
              objectFit: "cover",
            }}
            alt={banner.title}
          />

          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background: "rgba(0,0,0,0.45)",
            }}
          />

          <div
            className="position-absolute top-50 start-50 translate-middle text-center text-white"
            style={{
              width: "90%",
              maxWidth: "900px",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "4.5rem",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                  textShadow: "0 5px 25px rgba(0,0,0,.7)",
                }}
              >
                {banner.title}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* ================= INFORMASI ================= */}

      {/* ================= INFORMASI ================= */}

      <section className="container py-5" id="informasi">
        <h2 className="fw-bold text-center mb-5">Informasi PASTIKA</h2>

        {informasi.map((item) => (
          <div
            key={item._id}
            className="card shadow-sm border-0 mb-5 overflow-hidden"
          >
            <div className="row g-0 align-items-center">
              {/* Gambar */}
              <div className="col-lg-7">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="img-fluid w-100"
                  style={{
                    height: "420px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Caption */}
              <div className="col-lg-5 d-flex align-items-center">
                <div className="card-body p-4">
                  <p
                    className="mb-0"
                    style={{
                      textAlign: "justify",
                      fontSize: "17px",
                      lineHeight: "1.8",
                    }}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ================= LAYANAN ================= */}

      <section className="container-fluid py-5" id="layanan">
        <h2 className="fw-bold text-center mb-4">Informasi Layanan</h2>

        <div
          id="layananCarousel"
          className="carousel slide shadow-lg rounded overflow-hidden mx-auto"
          style={{ maxWidth: "1800px" }}
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {layanan.map((item, index) => (
              <div
                key={item._id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={item.images[0]}
                  className="d-block w-100"
                  style={{
                    height: "780px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                  }}
                  alt={item.title}
                />

                {/* Caption */}
                <div className="carousel-caption pb-5">
                  <h2
                    className="fw-bold"
                    style={{
                      fontSize: "2.5rem",
                      textShadow: "2px 2px 10px rgba(0,0,0,.8)",
                    }}
                  >
                    {item.title}
                  </h2>

                  {/* Nomor Slide */}
                  <div
                    className="mt-3"
                    style={{
                      fontSize: "18px",
                      letterSpacing: "3px",
                      textShadow: "2px 2px 10px rgba(0,0,0,.8)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(layanan.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#layananCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          {/* Next */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#layananCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>
      {/* ================= KEGIATAN ================= */}

      <section className="container py-5" id="kegiatan">
        <h2 className="fw-bold text-center mb-4">Kegiatan PASTIKA</h2>

        <div className="row">
          {kegiatan.map((item) =>
            item.images.map((img, index) => (
              <div className="col-md-4 mb-4" key={`${item._id}-${index}`}>
                <div className="card shadow-sm h-100">
                  <img
                    src={img}
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="card-body text-center">
                    <h5>{item.title}</h5>
                  </div>
                </div>
              </div>
            )),
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
