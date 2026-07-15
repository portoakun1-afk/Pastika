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
      <h2 className="fw-bold mb-4">Permintaan Belanja</h2>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th width="60">No</th>
                <th>Barang</th>
                <th width="100">Jumlah</th>
                <th width="100">Satuan</th>
                <th>Seksi</th>
                <th>Pemohon</th>
                <th width="170">Status</th>
                <th width="170">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {request.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Belum ada permintaan.
                  </td>
                </tr>
              ) : (
                request.map((r, index) => (
                  <tr key={r._id}>
                    <td>{index + 1}</td>

                    <td>{r.namaBarang}</td>

                    <td>{r.jumlah}</td>

                    <td>{r.satuan}</td>

                    <td>{r.seksi}</td>

                    <td>{r.pemohon}</td>

                    <td>
                      <span
                        className={`badge ${
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
                          className="btn btn-success btn-sm"
                          onClick={() => selesaiBelanja(r._id)}
                        >
                          Sudah Dibeli
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger btn-sm"
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
    </Layout>
  );
}

export default DashboardAdmin;
