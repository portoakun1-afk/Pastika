const mongoose = require("mongoose");

const barangSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },

  stok: {
    type: Number,
    default: 0,
  },

  satuan: {
    type: String,
    required: true,
  },

  minimalStok: {
    type: Number,
    default: 10,
  },

  deskripsi: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Barang", barangSchema);