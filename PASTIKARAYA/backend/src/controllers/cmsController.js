const CMS = require("../models/cmsModel");

// ============================
// CREATE CMS
// ============================

exports.createCMS = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const images = [];

    if (req.files) {
      req.files.forEach((file) => {
        images.push(file.path);
      });
    }

    const cms = await CMS.create({
      section: req.body.section,
      title: req.body.title,
      images,
    });

    res.status(201).json({
      message: "Konten berhasil disimpan",
      data: cms,
    });

  } catch (error) {
    console.error(error);   // <-- tambahkan ini

    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// GET ALL CMS
// ============================

exports.getCMS = async (req, res) => {
  try {
    const data = await CMS.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateCMS = async (req, res) => {
  try {
    const cms = await CMS.findById(req.params.id);

    if (!cms) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    cms.section = req.body.section;

    cms.title = req.body.title;

    if (req.files && req.files.length > 0) {
      cms.images = [];

      req.files.forEach((file) => {
        cms.images.push(file.path);
      });
    }

    await cms.save();

    res.json({
      message: "Berhasil diupdate",

      data: cms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ============================
// DELETE SATU GAMBAR
// ============================

exports.deleteImage = async (req, res) => {
  try {
    const { id, index } = req.params;

    const cms = await CMS.findById(id);

    if (!cms) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    if (index >= cms.images.length) {
      return res.status(400).json({
        message: "Index gambar tidak ditemukan",
      });
    }

    cms.images.splice(Number(index), 1);

    // Jika gambar sudah habis, hapus seluruh dokumen
    if (cms.images.length === 0) {
      await cms.deleteOne();

      return res.json({
        message: "Semua gambar telah dihapus, konten ikut dihapus",
      });
    }

    // Jika masih ada gambar, simpan perubahan
    await cms.save();

    res.json({
      message: "Gambar berhasil dihapus",
      data: cms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ============================
// DELETE SATU KONTEN
// ============================

exports.deleteCMS = async (req, res) => {
  try {
    const cms = await CMS.findByIdAndDelete(req.params.id);

    if (!cms) {
      return res.status(404).json({
        message: "Data tidak ditemukan",
      });
    }

    res.json({
      message: "Konten berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
