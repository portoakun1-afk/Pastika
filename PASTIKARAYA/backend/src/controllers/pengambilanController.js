const Pengambilan = require("../models/pengambilanModel");
const Barang = require("../models/barangModel");

// GET Riwayat
exports.getPengambilan = async (req, res) => {
    try {

        console.log("USER LOGIN:", req.user);

        let query = {};

        if (req.user.role !== "admin") {
            query.seksi = req.user.seksi;
        }

        const data = await Pengambilan.find(query)
            .populate("barang")
            .sort({ createdAt: -1 });

        console.log(data);

        res.json(data);

    } catch(err){

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }
}

// POST Pengambilan Barang
exports.ambilBarang = async (req, res) => {
  try {
    console.log("=== AMBIL BARANG ===");
    console.log("BODY :", req.body);
    console.log("USER :", req.user);

    const { barang, jumlah } = req.body;

    const dataBarang = await Barang.findById(barang);

    console.log("BARANG :", dataBarang);

    if (!dataBarang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }

    if (dataBarang.stok < Number(jumlah)) {
      return res.status(400).json({
        message: "Stok tidak mencukupi",
      });
    }

    dataBarang.stok -= Number(jumlah);
    await dataBarang.save();

    console.log("STOK BERHASIL DIKURANGI");

    const hasil = await Pengambilan.create({
      barang: dataBarang._id,
      pengambil: req.user.nama,
      seksi: req.user.seksi,
      jumlah: Number(jumlah),
    });

    console.log("DATA TERSIMPAN");
    console.log(hasil);

    res.json({
      message: "Barang berhasil diambil",
    });
  } catch (err) {
    console.log("ERROR:");
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};