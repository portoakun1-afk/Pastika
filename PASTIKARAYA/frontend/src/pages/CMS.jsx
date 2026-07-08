import BannerCMS from "../components/BannerCMS";
import CMSSection from "../components/cmsSection";

function CMS() {
  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4 text-center">
        Content Management System
      </h2>

      {/* ================= BANNER ================= */}

      <BannerCMS />

      {/* ================= INFORMASI ================= */}

      <CMSSection
        section="informasi"
        title="Informasi PASTIKA"
        color="success"
        multiple={true}
      />

      {/* ================= LAYANAN ================= */}

      <CMSSection
        section="layanan"
        title="Informasi Layanan"
        color="warning"
        multiple={true}
      />

      {/* ================= KEGIATAN ================= */}

      <CMSSection
        section="kegiatan"
        title="Kegiatan PASTIKA"
        color="info"
        multiple={true}
      />

    </div>
  );
}

export default CMS;