import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/authContext";
import logo from "../assets/logo-pastika.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      login(res.data.token, res.data.user);

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid bg-light d-flex justify-content-center align-items-center px-3"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow border-0 w-100"
        style={{
          maxWidth: "420px",
          borderRadius: "18px",
        }}
      >
        <div className="card-body p-4 p-md-5">

          <div className="text-center mb-4">
            <img
              src={logo}
              alt="PASTIKA"
              width="80"
              className="mb-3 img-fluid"
            />

            <h3 className="fw-bold mb-1">
              Login PASTIKA
            </h3>

            <small className="text-muted">
              Sistem Persediaan ATK Lapas Narkotika Kelas IIA Pematangsiantar
            </small>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Username
              </label>

              <input
                type="text"
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-success w-100 py-2"
              disabled={loading}
            >
              {loading ? "Masuk..." : "Login"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => navigate("/")}
            >
              Kembali ke Beranda
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;