import { useEffect, useState } from "react";
import API from "../api/api";
import Layout from "../components/Layout";

function Barang() {
  const [editId, setEditId] = useState(null);

  const [barang, setBarang] = useState([]);

  const [form, setForm] = useState({
    nama: "",
    stok: "",
    satuan: "",
    deskripsi: "",
  });

  const loadBarang = async () => {
    const res = await API.get("/barang");

    setBarang(res.data);
  };

  useEffect(() => {
    loadBarang();
  }, []);

const submit = async (e) => {
  e.preventDefault();

  if (editId) {
    await API.put(`/barang/${editId}`, form);
    alert("Barang berhasil diupdate");
  } else {
    await API.post("/barang", form);
    alert("Barang berhasil ditambahkan");
  }

  setForm({
    nama: "",
    stok: "",
    satuan: "",
    deskripsi: "",
  });

  setEditId(null);

  loadBarang();
};

  const hapusBarang = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus barang ini?");

    if (!konfirmasi) return;

    try {
      await API.delete(`/barang/${id}`);
      loadBarang();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus barang");
    }
  };

const editBarang = (barang) => {
  setEditId(barang._id);

  setForm({
    nama: barang.nama,
    stok: barang.stok,
    satuan: barang.satuan,
    deskripsi: barang.deskripsi,
  });
};

  const tambahStok = async (id) => {
    const jumlah = prompt("Tambah stok:");

    if (!jumlah) return;

    await API.put(`/barang/tambah-stok/${id}`, {
      jumlah,
    });

    loadBarang();
  };
  return (
    <Layout>
      <h2 className="fw-bold mb-4">Master Barang</h2>

      <form className="card p-3 mb-4" onSubmit={submit}>
        <div className="row">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Nama Barang"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Stok"
              value={form.stok}
              onChange={(e) =>
                setForm({
                  ...form,
                  stok: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Satuan"
              value={form.satuan}
              onChange={(e) =>
                setForm({
                  ...form,
                  satuan: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Deskripsi"
              value={form.deskripsi}
              onChange={(e) =>
                setForm({
                  ...form,
                  deskripsi: e.target.value,
                })
              }
            />
          </div>

          <div className="col-md-1">
            <button className="btn btn-success w-100">
              {editId ? "Update" : "Tambah"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Barang</th>
            <th>Stok</th>
            <th>Satuan</th>
            <th>Deskripsi</th>
            <th width="120">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {barang.map((b, i) => (
            <tr key={b._id}>
              <td>{i + 1}</td>
              <td>{b.nama}</td>
              <td>{b.stok}</td>
              <td>{b.satuan}</td>
              <td>{b.deskripsi}</td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => tambahStok(b._id)}
                >
                  + Stok
                </button>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editBarang(b)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => hapusBarang(b._id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Barang;
