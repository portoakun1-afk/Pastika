const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    namaBarang: {
      type: String,
      required: true,
      trim: true,
    },

    jumlah: {
      type: Number,
      required: true,
      min: 1,
    },

    keterangan: {
      type: String,
      default: "",
    },

    seksi: {
      type: String,
      required: true,
    },

    pemohon: {
      type: String,
      required: true,
    },
    satuan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Menunggu", "Sudah Ada", "Selesai"],
      default: "Menunggu",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Request", requestSchema);
