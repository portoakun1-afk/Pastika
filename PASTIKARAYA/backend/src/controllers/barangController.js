const Barang = require("../models/barangModel");

// GET
exports.getBarang = async (req, res) => {
  try {
    const data = await Barang.find().sort({
      nama: 1,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createBarang = async (req, res) => {
  try {
    const barang = await Barang.create(req.body);

    res.status(201).json({
      message: "Barang berhasil ditambahkan",
      data: barang,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
exports.updateBarang = async (req, res) => {
  try {
    const barang = await Barang.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Barang berhasil diupdate",
      data: barang,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
exports.deleteBarang = async (req, res) => {
  try {
    await Barang.findByIdAndDelete(req.params.id);

    res.json({
      message: "Barang berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.tambahStok = async (req, res) => {
  try {
    const { jumlah } = req.body;

    const barang = await Barang.findById(req.params.id);

    if (!barang) {
      return res.status(404).json({
        message: "Barang tidak ditemukan",
      });
    }

    barang.stok += Number(jumlah);

    await barang.save();

    res.json({
      message: "Stok berhasil ditambahkan",
      data: barang,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};