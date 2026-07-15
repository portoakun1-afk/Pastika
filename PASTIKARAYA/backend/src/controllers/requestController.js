const Request = require("../models/requestModel");
const Barang = require("../models/barangModel");

exports.createRequest = async (req, res) => {
  try {
    const request = await Request.create({
      namaBarang: req.body.namaBarang,
      jumlah: req.body.jumlah,
      satuan: req.body.satuan,
      keterangan: req.body.keterangan,
      seksi: req.user.seksi,
      pemohon: req.user.nama,
    });

    res.status(201).json({
      message: "Permintaan berhasil dikirim",
      data: request,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getRequests = async (req, res) => {
  const data = await Request.find().sort({
    createdAt: -1,
  });

  res.json(data);
};

exports.getMyRequests = async (req, res) => {
  const data = await Request.find({
    seksi: req.user.seksi,
  }).sort({
    createdAt: -1,
  });

  res.json(data);
};

exports.updateStatus = async (req, res) => {
  const request = await Request.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    {
      new: true,
    },
  );

  res.json({
    message: "Status berhasil diperbarui",
    data: request,
  });
};

exports.deleteRequest = async (req, res) => {
  try {

    await Request.findByIdAndDelete(req.params.id);

    res.json({
      message: "Permintaan berhasil dihapus",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};
