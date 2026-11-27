import { useState } from "react";
import { useAuth } from "../AuthContext.jsx";

// wishlist : array buku yang sama dengan yang dikirim ke <WishlistPanel buku={...} />
// onHapus  : fungsi hapus yang sama dengan onHapus di WishlistPanel
// onDetail : fungsi buka detail yang sama dengan onDetail di WishlistPanel
export default function AuthStatus({ wishlist = [], onHapus, onDetail }) {
  const { user, openAuth, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

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
        <button
          onClick={() => setShowProfile(true)}
          aria-label={`Buka profil ${user.nama}`}
          title={`Profil: ${user.nama}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#F6F1E4] bg-slate-800 text-[#F6F1E4] transition-colors hover:bg-amber-400 hover:text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </button>
      </div>

      {/* Modal Profil / Panel Pengguna */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#F6F1E4] border-4 border-slate-900 max-w-lg w-full p-6 shadow-[6px_6px_0px_0px_#0f172a] relative text-slate-900 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowProfile(false)}
              aria-label="Tutup"
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

            {/* KONTROL KHUSUS ADMIN */}
            {user.role === "admin" && (
              <div className="mb-6 bg-amber-100 border-2 border-slate-900 p-4">
                <h3 className="font-bold text-base text-amber-900 mb-2 flex items-center gap-2">
                  <span>⚙️</span> Menu Kelola Admin
                </h3>
                <p className="text-xs text-slate-700 mb-3">
                  Akses cepat untuk mengelola koleksi buku dan data perpustakaan.
                </p>
                {/* "#/admin" = halaman AdminPage React. Kalau tim pakai alamat lain, sesuaikan. */}
                <a
                  href="/admin.html"
                  className="inline-block w-full text-center bg-slate-900 text-[#F6F1E4] font-bold py-2 px-4 border-2 border-slate-900 hover:bg-amber-600 transition"
                >
                  Buka Halaman Kelola Buku (Admin Panel) →
                </a>
              </div>
            )}

            {/* Wishlist: datanya SAMA dengan "Buku Dipilih" dan WishlistPanel */}
            <div className="border-t-2 border-slate-900 pt-4 mb-6">
              <h3 className="font-bold text-lg mb-2">Wishlist Buku Saya ({wishlist.length})</h3>
              {wishlist.length === 0 ? (
                <p className="text-sm text-slate-600 italic">Belum ada buku di wishlist kamu.</p>
              ) : (
                <ul className="max-h-48 overflow-y-auto space-y-2 pr-2">
                  {wishlist.map((b) => (
                    <li key={b.id} className="bg-white border-2 border-slate-900 p-2 text-sm flex items-center justify-between gap-2">
                      <span className="min-w-0 truncate font-semibold">{b.judul}</span>
                      <span className="flex shrink-0 gap-3">
                        <button
                          onClick={() => { setShowProfile(false); onDetail?.(b); }}
                          className="underline hover:text-amber-700"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => onHapus?.(b)}
                          className="underline text-[#7B202B] hover:text-red-600"
                        >
                          Hapus
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tombol Aksi di Bagian Bawah Modal */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => { setShowProfile(false); signOut(); }}
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