import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/authContext";

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
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card shadow border-0"
        style={{
          width: "100%",
          maxWidth: "430px",
          borderRadius: "18px",
        }}
      >
        <div className="card-body p-5">

          <h2 className="fw-bold text-center mb-4">
            Login PASTIKA
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
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
              <label className="form-label">
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
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Masuk..." : "Login"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;