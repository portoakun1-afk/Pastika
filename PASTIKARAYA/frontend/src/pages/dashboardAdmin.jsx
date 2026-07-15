import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function DashboardAdmin() {
  const [request, setRequest] = useState([]);

  const loadRequest = async () => {
    try {
      const res = await API.get("/request");
      setRequest(res.data);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data permintaan.");
    }
  };

  useEffect(() => {
    loadRequest();
  }, []);

  const selesaiBelanja = async (id) => {
    try {
      await API.put(`/request/${id}`, {
        status: "Sudah Ada Stok",
      });

      alert("Status berhasil diperbarui.");

      loadRequest();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengubah status");
    }
  };

  const hapusRequest = async (id) => {
    if (!window.confirm("Hapus permintaan ini?")) return;

    try {
      await API.delete(`/request/${id}`);

      alert("Permintaan berhasil dihapus.");

      loadRequest();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus");
    }
  };

return (
  <Layout>
    <div className="card shadow-sm border-0">
      <div className="card-header bg-success text-white">
        <h4 className="mb-0 fw-bold">Permintaan Belanja</h4>
      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-bordered table-hover align-middle mb-0">

            <thead className="table-success">
              <tr>
                <th>No</th>
                <th>Barang</th>
                <th>Jumlah</th>
                <th>Satuan</th>
                <th>Seksi</th>
                <th>Pemohon</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {request.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Belum ada permintaan.
                  </td>
                </tr>
              ) : (
                request.map((r, index) => (
                  <tr key={r._id}>
                    <td>{index + 1}</td>

                    <td className="fw-semibold">
                      {r.namaBarang}
                    </td>

                    <td>{r.jumlah}</td>

                    <td>{r.satuan}</td>

                    <td>{r.seksi}</td>

                    <td>{r.pemohon}</td>

                    <td>
                      <span
                        className={`badge rounded-pill ${
                          r.status === "Menunggu"
                            ? "bg-warning text-dark"
                            : r.status === "Sudah Ada Stok"
                            ? "bg-primary"
                            : "bg-success"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td>
                      {r.status === "Menunggu" ? (
                        <button
                          className="btn btn-success btn-sm w-100"
                          onClick={() => selesaiBelanja(r._id)}
                        >
                          Sudah Dibeli
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger btn-sm w-100"
                          onClick={() => hapusRequest(r._id)}
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
    </div>
  </Layout>
);
}

export default DashboardAdmin;
