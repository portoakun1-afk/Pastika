import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import API from "../api/api";

function RiwayatPengambilan() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await API.get("/pengambilan");
      setData(res.data);
    } catch (err) {
      alert("Gagal mengambil data riwayat");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h2 className="fw-bold mb-4">
            Riwayat Pengambilan Barang
          </h2>

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-success">
              <tr>
                <th width="60">No</th>
                <th width="140">Tanggal</th>
                <th>Pengambil</th>
                <th>Seksi</th>
                <th>Barang</th>
                <th width="100">Jumlah</th>
              </tr>
            </thead>

            <tbody>

              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Belum ada riwayat pengambilan.
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item._id}>

                    <td>{index + 1}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </td>

                    <td>{item.pengambil}</td>

                    <td>{item.seksi}</td>

                    <td>{item.barang?.nama}</td>

                    <td>{item.jumlah}</td>

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

export default RiwayatPengambilan;