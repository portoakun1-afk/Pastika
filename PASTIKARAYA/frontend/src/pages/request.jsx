import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function Request() {
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState([]);

  const [form, setForm] = useState({
    namaBarang: "",
    jumlah: "",
    keterangan: "",
    satuan: "",
  });

  const loadRequest = async () => {
    try {
      const res = await API.get("/request/me");
      setRequest(res.data);
    } catch (err) {
      alert("Gagal mengambil data permintaan");
    }
  };

  useEffect(() => {
    loadRequest();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.namaBarang) {
      return alert("Nama barang wajib diisi");
    }

    if (!form.jumlah || Number(form.jumlah) <= 0) {
      return alert("Jumlah tidak valid");
    }

    try {
      setLoading(true);

      await API.post("/request", {
        namaBarang: form.namaBarang,
        jumlah: Number(form.jumlah),
        satuan: form.satuan,
        keterangan: form.keterangan,
      });

      alert("Permintaan berhasil dikirim");

      setForm({
        namaBarang: "",
        jumlah: "",
        keterangan: "",
      });

      loadRequest();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengirim permintaan");
    } finally {
      setLoading(false);
    }
  };

  const hapus = async (id) => {
    if (!window.confirm("Hapus data ini?")) return;

    try {
      await API.delete("/request/" + id);

      loadData();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Layout>
      <h2 className="fw-bold mb-4">Permintaan Belanja</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Nama Barang</label>

              <input
                className="form-control"
                placeholder="Contoh : Printer Epson L3210"
                value={form.namaBarang}
                onChange={(e) =>
                  setForm({
                    ...form,
                    namaBarang: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Jumlah</label>

              <input
                type="number"
                className="form-control"
                min="1"
                value={form.jumlah}
                onChange={(e) =>
                  setForm({
                    ...form,
                    jumlah: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Satuan</label>

              <input
                className="form-control"
                placeholder="Contoh : Unit, Rim, Box, Botol"
                value={form.satuan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    satuan: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Keterangan</label>

              <textarea
                className="form-control"
                rows="3"
                value={form.keterangan}
                onChange={(e) =>
                  setForm({
                    ...form,
                    keterangan: e.target.value,
                  })
                }
              />
            </div>

            <button className="btn btn-success" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Permintaan"}
            </button>
          </form>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Riwayat Permintaan</h5>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah</th>
                <th>Keterangan</th>
                <th>Satuan</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {request.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Belum ada permintaan
                  </td>
                </tr>
              ) : (
                request.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.namaBarang}</td>
                    <td>{item.jumlah}</td>
                    <td>{item.keterangan}</td>
                    <td>{item.satuan}</td>
                    <td>
                      {item.status === "Menunggu" && (
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => updateStatus(item._id)}
                        >
                          menunggu
                        </button>
                      )}

                      {item.status === "Selesai" && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => hapus(item._id)}
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Request;
