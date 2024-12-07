import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginSection = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 400 || response.status === 401) {
          setErrors({ general: data.message });
        } else {
          setErrors({ general: "Unexpected error occurred." });
        }
      } else {
        const data = await response.json();
        const { token, role, userDetails } = data;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        onLoginSuccess(role);

        switch (role) {
          case "farmer":
            navigate("/farmer-marketplace");
            break;
          case "business":
            navigate("/business-marketplace");
            break;
          case "admin":
            navigate("/admin-marketplace");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "An error occurred. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="d-flex align-items-center py-5">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card" style={{ backgroundColor: "#333", color: "#fff" }}>
              <div className="card-body p-4">
                <h3 className="my-3 text-uppercase text-center">Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-3">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  {errors.general && (
                    <div className="alert alert-danger" role="alert">
                      {errors.general}
                    </div>
                  )}
                  <button type="submit" className="btn btn-success w-100" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#0dcaf0" }}>Register here</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
