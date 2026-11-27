import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext.jsx";

export default function AuthStatus() {
  const { user, openAuth, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Ambil wishlist khusus milik user yang sedang aktif dari localStorage
  useEffect(() => {
    if (user && showProfile) {
      const key = `wishlist_user_${user.id || user.email}`;
      const saved = localStorage.getItem(key);
      setWishlist(saved ? JSON.parse(saved) : []);
    }
  }, [user, showProfile]);

  const tombol = "border-2 border-[#F6F1E4] px-3 py-1.5 text-sm font-bold bg-[#F6F1E4] text-slate-900 hover:bg-amber-400 transition-colors";
  const tombolOutline = "border-2 border-[#F6F1E4] px-2.5 py-1 text-xs font-bold bg-transparent text-[#F6F1E4] hover:bg-[#7B202B] hover:border-[#7B202B] transition-colors";

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => openAuth("login")} className={tombol}>
          Login
        </button>
        <button onClick={() => openAuth("register")} className={tombolOutline}>
          Daftar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Tombol yang menampilkan nama dan membuka modal profil/panel */}
        <button
          onClick={() => setShowProfile(true)}
          className="text-sm text-amber-300 font-medium hover:underline text-left max-w-[120px] truncate"
          title="Buka Profil"
        >
          Halo, {user.nama}!
        </button>
      </div>

      {/* Modal Profil / Panel Pengguna */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#F6F1E4] border-4 border-slate-900 max-w-lg w-full p-6 shadow-[6px_6px_0px_0px_#0f172a] relative text-slate-900 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setShowProfile(false)}
              className="absolute top-4 right-4 text-xl font-bold hover:text-red-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-serif font-bold mb-4 border-b-2 border-slate-900 pb-2">
              {user.role === "admin" ? "Panel & Profil Administrator" : "Profil Pengguna"}
            </h2>

            {/* Informasi Akun Dasar */}
            <div className="space-y-1 mb-4 text-slate-800 bg-white p-3 border-2 border-slate-900">
              <p><strong>Nama:</strong> {user.nama || "-"}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p>
                <strong>Role:</strong>{" "}
                <span className="uppercase bg-slate-900 text-[#F6F1E4] px-2 py-0.5 text-xs font-bold">
                  {user.role}
                </span>
              </p>
            </div>

            {/* KONTROL KHUSUS ADMIN: Hanya muncul jika rolenya admin */}
            {user.role === "admin" && (
              <div className="mb-6 bg-amber-100 border-2 border-slate-900 p-4">
                <h3 className="font-bold text-base text-amber-900 mb-2 flex items-center gap-2">
                  <span>⚙️</span> Menu Kelola Admin
                </h3>
                <p className="text-xs text-slate-700 mb-3">
                  Akses cepat untuk mengelola koleksi buku dan data perpustakaan.
                </p>
                <a
                  href="/admin.html"
                  className="inline-block w-full text-center bg-slate-900 text-[#F6F1E4] font-bold py-2 px-4 border-2 border-slate-900 hover:bg-amber-600 transition"
                >
                  Buka Halaman Kelola Buku (Admin Panel) →
                </a>
              </div>
            )}

            {/* Wishlist Buku Tersimpan Per User */}
            <div className="border-t-2 border-slate-900 pt-4 mb-6">
              <h3 className="font-bold text-lg mb-2">Wishlist Buku Saya</h3>
              {wishlist.length === 0 ? (
                <p className="text-sm text-slate-600 italic">Belum ada buku di wishlist kamu.</p>
              ) : (
                <ul className="max-h-36 overflow-y-auto space-y-2 pr-2">
                  {wishlist.map((item, idx) => (
                    <li key={idx} className="bg-white border-2 border-slate-900 p-2 text-sm flex justify-between items-center">
                      <span>{item.judul || item.title || `Buku #${idx + 1}`}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tombol Aksi di Bagian Bawah Modal */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setShowProfile(false);
                  signOut();
                }}
                className="w-full bg-[#7B202B] text-[#F6F1E4] font-bold py-2 border-2 border-slate-900 hover:bg-red-900 transition"
              >
                Keluar
              </button>
              
              <button
                onClick={() => setShowProfile(false)}
                className="w-full bg-slate-900 text-[#F6F1E4] font-bold py-2 border-2 border-slate-900 hover:bg-slate-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}