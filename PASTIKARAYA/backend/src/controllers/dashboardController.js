const Barang = require("../models/barangModel");
const Request = require("../models/requestModel");
const Pengambilan = require("../models/pengambilanModel");

exports.dashboardAdmin = async (req, res) => {
  try {
    const totalBarang = await Barang.countDocuments();

    const totalPengambilan = await Pengambilan.countDocuments();

    const totalPermintaan = await Request.countDocuments();

    const permintaanMenunggu = await Request.countDocuments({
      status: "Menunggu",
    });

    const stokMenipis = await Barang.countDocuments({
      stok: { $lte: 10 },
    });

    const barangMenipis = await Barang.find({
      stok: { $lte: 10 },
    }).sort({
      stok: 1,
    });

    const permintaanTerbaru = await Request.find({
      status: "Menunggu",
    })
      .populate("barang")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    const pengambilanTerbaru = await Pengambilan.find()
      .populate("barang")
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.json({
      totalBarang,
      totalPengambilan,
      totalPermintaan,
      permintaanMenunggu,
      stokMenipis,
      barangMenipis,
      permintaanTerbaru,
      pengambilanTerbaru,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};