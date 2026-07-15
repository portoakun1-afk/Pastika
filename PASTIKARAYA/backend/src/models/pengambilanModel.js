const mongoose = require("mongoose");

const pengambilanSchema = new mongoose.Schema(
  {
    barang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barang",
      required: true,
    },

    pengambil: {
      type: String,
      required: true,
    },

    seksi: {
      type: String,
      required: true,
    },

    jumlah: {
      type: Number,
      required: true,
    },

    tanggal: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pengambilan", pengambilanSchema);