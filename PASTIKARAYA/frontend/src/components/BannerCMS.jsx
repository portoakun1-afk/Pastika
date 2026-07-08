import { useEffect, useState } from "react";
import API from "../api/api";

function BannerCMS() {
  const [banner, setBanner] = useState(null);

  const [title, setTitle] = useState("");

  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadBanner();
  }, []);

  const loadBanner = async () => {
    try {
      const res = await API.get("/cms");

      const data = res.data.find((item) => item.section === "banner");

      if (data) {
        setBanner(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pilihGambar = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const simpanBanner = async () => {
    try {
      const formData = new FormData();

      formData.append("section", "banner");

      formData.append("title", title);

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (editId) {
        await API.put(`/cms/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Banner berhasil diupdate");
      } else {
        await API.post("/cms", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Banner berhasil ditambahkan");
      }

      setTitle("");

      setImages([]);

      setPreview([]);

      setEditId(null);

      loadBanner();
    } catch (error) {
      console.log(error);

      alert("Gagal menyimpan banner");
    }
  };

  const editBanner = () => {
    if (!banner) return;

    setEditId(banner._id);

    setTitle(banner.title);

    setPreview(banner.images);
  };

  const hapusBanner = async () => {
    if (!banner) return;

    if (!window.confirm("Yakin ingin menghapus banner?")) return;

    try {
      await API.delete(`/cms/${banner._id}`);

      setBanner(null);

      setTitle("");

      setPreview([]);

      setImages([]);

      setEditId(null);

      alert("Banner berhasil dihapus");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Banner Utama</h5>
      </div>

      <div className="card-body">
        <input
          className="form-control mb-3"
          placeholder="Judul Banner"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="form-control mb-3"
          onChange={pilihGambar}
        />

        <div className="row">
          {preview.map((img, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <div className="d-flex gap-2">
          <button
            className={`btn ${editId ? "btn-warning" : "btn-primary"}`}
            onClick={simpanBanner}
          >
            {editId ? "Update Banner" : "Simpan Banner"}
          </button>

          {banner && (
            <>
              <button className="btn btn-success" onClick={editBanner}>
                Edit
              </button>

              <button className="btn btn-danger" onClick={hapusBanner}>
                Hapus
              </button>
            </>
          )}
        </div>

        {banner && (
          <>
            <hr />

            <h6 className="fw-bold mb-3">Banner Saat Ini</h6>

            <div className="card">
              <img
                src={banner.images[0]}
                className="card-img-top"
                style={{
                  height: "300px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5 className="fw-bold">{banner.title}</h5>

                <p className="text-muted mb-0">
                  Jumlah Gambar : {banner.images.length}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BannerCMS;
