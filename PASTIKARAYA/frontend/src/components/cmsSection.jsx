import { useEffect, useState } from "react";
import API from "../api/api";

function CMSSection({ section, title, color = "primary", multiple = true }) {
  const [contents, setContents] = useState([]);

  const [judul, setJudul] = useState("");

  const [images, setImages] = useState([]);

  const [preview, setPreview] = useState([]);

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/cms");

      setContents(res.data.filter((item) => item.section === section));
    } catch (error) {
      console.log(error);
    }
  };

  const pilihGambar = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const simpanData = async () => {
    try {
      const formData = new FormData();

      formData.append("section", section);

      formData.append("title", judul);

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (editId) {
        await API.put(`/cms/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Berhasil diupdate");
      } else {
        await API.post("/cms", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        alert("Berhasil ditambahkan");
      }

      setJudul("");

      setImages([]);

      setPreview([]);

      setEditId(null);

      loadData();
    } catch (error) {
      console.log(error);

      alert("Gagal menyimpan");
    }
  };

  const editData = (item) => {
    setEditId(item._id);

    setJudul(item.title);

    setPreview(item.images);
  };

  const hapusData = async (id) => {
    if (!window.confirm("Yakin ingin menghapus?")) return;

    try {
      await API.delete(`/cms/${id}`);

      loadData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card shadow mb-4">
      <div
        className={`card-header bg-${color} ${
          color === "warning" ? "" : "text-white"
        }`}
      >
        <h5 className="mb-0">{title}</h5>
      </div>

      <div className="card-body">
        <input
          className="form-control mb-3"
          placeholder={title}
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />

        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          className="form-control mb-3"
          onChange={pilihGambar}
        />

        <div className="row">
          {preview.map((img, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <img
                src={img}
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <button className={`btn btn-${color}`} onClick={simpanData}>
          {editId ? "Update" : "Tambah"}
        </button>

        <hr />

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th width="70">No</th>

              <th>Judul</th>

              <th width="160">Jumlah Gambar</th>

              <th width="180">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {contents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  Belum ada data
                </td>
              </tr>
            ) : (
              contents.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.title}</td>

                  <td>
                    <span className="badge bg-secondary">
                      {item.images.length} Gambar
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editData(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => hapusData(item._id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {contents.length > 0 && (
          <>
            <hr />

            <div className="row">
              {contents.map((item) =>
                item.images.map((img, index) => (
                  <div className="col-md-3 mb-4" key={`${item._id}-${index}`}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={img}
                        className="card-img-top"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                        }}
                      />

                      <div className="card-body">
                        <h6 className="fw-bold text-center">{item.title}</h6>
                      </div>
                    </div>
                  </div>
                )),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CMSSection;
