import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import "../auth.css";

const EMPTY = { nama: "", email: "", password: "", konfirmasi: "" };

export default function AuthModal() {
  const { modal, openAuth, closeAuth, signIn, signUp } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Tutup dengan tombol Escape, dan reset pesan error setiap form dibuka / ganti tab
  useEffect(() => {
    if (!modal) return;
    setError("");
    const onKey = (e) => e.key === "Escape" && closeAuth();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, closeAuth]);

  if (!modal) return null;

  const isRegister = modal === "register";
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  function validate() {
    if (isRegister && !form.nama.trim()) return "Nama wajib diisi.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return "Format email tidak valid.";
    if (form.password.length < 6) return "Kata sandi minimal 6 karakter.";
    if (isRegister && form.password !== form.konfirmasi)
      return "Konfirmasi kata sandi tidak sama.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const message = validate();
    if (message) return setError(message);

    setBusy(true);
    setError("");
    try {
      const email = form.email.trim();
      if (isRegister) {
        await signUp({ nama: form.nama.trim(), email, password: form.password });
      } else {
        await signIn({ email, password: form.password });
      }
      setForm(EMPTY);
      closeAuth();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-backdrop" onMouseDown={(e) => e.target === e.currentTarget && closeAuth()}>
      <div className="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="auth-close" onClick={closeAuth} aria-label="Tutup">
          ×
        </button>

        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={!isRegister}
            className={!isRegister ? "active" : ""}
            onClick={() => openAuth("login")}
          >
            Login
          </button>
          <button
            role="tab"
            aria-selected={isRegister}
            className={isRegister ? "active" : ""}
            onClick={() => openAuth("register")}
          >
            Daftar
          </button>
        </div>

        <h2 id="auth-title">{isRegister ? "Buat akun baru" : "Login ke akun kamu"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <label>
              Nama
              <input
                type="text"
                value={form.nama}
                onChange={update("nama")}
                autoComplete="name"
                autoFocus
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
              autoFocus={!isRegister}
            />
          </label>

          <label>
            Kata sandi
            <input
              type="password"
              value={form.password}
              onChange={update("password")}
              autoComplete={isRegister ? "new-password" : "current-password"}
            />
          </label>

          {isRegister && (
            <label>
              Ulangi kata sandi
              <input
                type="password"
                value={form.konfirmasi}
                onChange={update("konfirmasi")}
                autoComplete="new-password"
              />
            </label>
          )}

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="auth-submit" disabled={busy}>
            {busy ? "Memproses..." : isRegister ? "Daftar" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}