const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CMS", cmsSchema);