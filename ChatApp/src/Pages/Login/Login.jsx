import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { authApi } from "../../api/auth";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");

  // Form verileri
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input değişikliklerini yakala
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Form gönderimi
  async function handleSubmit(e) {
    e.preventDefault(); // ✅ sayfa yenilenmesini durdur
    setError("");
    setLoading(true);

    try {
      if (currState === "Sign up") {
        // Basit doğrulamalar
        if (!form.username || !form.email || !form.password) {
          throw new Error("Lütfen tüm alanları doldurun.");
        }
        if (!form.agree) {
          throw new Error("Şartları kabul etmelisiniz.");
        }

        // Backend'e istek at
        const { data } = await authApi.createUser(
          form.username,
          form.email,
          form.password
        );

        console.log("Kayıt başarılı:", data);
        alert("Hesap oluşturuldu!");

        // Formu sıfırla ve login moduna geç
        setForm({ username: "", email: "", password: "", agree: false });
        setCurrState("Login");
      } else {
        // Login akışı
        const { data } = await authApi.login(form.username, form.password);
        console.log("Giriş başarılı:", data);
        alert("Giriş başarılı!");
        // örnek: navigate('/chat');
      }
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || "Hata";
      console.error("Hata:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="Logo" />

      <form className="login-from" onSubmit={handleSubmit}>
        <h2>{currState}</h2>

        {/* Sign up modunda username alanı */}
        {currState === "Sign up" && (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="form-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="form-input"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Hata mesajı */}
        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading
            ? "Lütfen bekleyin..."
            : currState === "Sign up"
            ? "Create Account"
            : "Login Now"}
        </button>

        {/* Kullanım şartları */}
        {currState === "Sign up" && (
          <div className="login-term">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            <p>Agree to the terms of use & privacy policy</p>
          </div>
        )}

        {/* Form geçiş bağlantısı */}
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here!</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrState("Sign up")}>Click here!</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
