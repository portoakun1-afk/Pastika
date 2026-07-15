import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function Pengambilan() {
  const [barang, setBarang] = useState([]);
  const [jumlah, setJumlah] = useState({});
  const [loading, setLoading] = useState(false);

  const loadBarang = async () => {
    try {
      const res = await API.get("/barang");
      setBarang(res.data);
    } catch (err) {
      alert("Gagal memuat data barang");
    }
  };

  useEffect(() => {
    loadBarang();
  }, []);

  const ambilBarang = async (id) => {
    const qty = Number(jumlah[id]);

    if (!qty || qty <= 0) {
      return alert("Masukkan jumlah yang valid.");
    }

    try {
      setLoading(true);

      await API.post("/pengambilan", {
        barang: id,
        jumlah: qty,
      });

      alert("Barang berhasil diambil.");

      setJumlah((prev) => ({
        ...prev,
        [id]: "",
      }));

      loadBarang();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal mengambil barang");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="fw-bold mb-4">Pengambilan Barang</h2>

          <table className="table table-bordered table-hover align-middle">
            <thead className="table-success">
              <tr>
                <th width="60">No</th>
                <th>Nama Barang</th>
                <th width="100">Stok</th>
                <th width="120">Satuan</th>
                <th>Deskripsi</th>
                <th width="170">Jumlah Ambil</th>
                <th width="120">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {barang.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    Belum ada data barang.
                  </td>
                </tr>
              ) : (
                barang.map((b, index) => (
                  <tr key={b._id}>
                    <td>{index + 1}</td>

                    <td>{b.nama}</td>

                    <td>
                      <span
                        className={
                          b.stok <= 10 ? "badge bg-danger" : "badge bg-success"
                        }
                      >
                        {b.stok}
                      </span>
                    </td>

                    <td>{b.satuan}</td>

                    <td>{b.deskripsi || "-"}</td>

                    <td>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max={b.stok}
                        placeholder="Jumlah"
                        value={jumlah[b._id] || ""}
                        onChange={(e) =>
                          setJumlah({
                            ...jumlah,
                            [b._id]: e.target.value,
                          })
                        }
                      />
                    </td>

                    <td>
                      <button
                        className="btn btn-success btn-sm w-100"
                        disabled={loading || b.stok <= 0}
                        onClick={() => ambilBarang(b._id)}
                      >
                        <i className="bi bi-box-arrow-down me-1"></i>
                        Ambil
                      </button>
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

export default Pengambilan;
