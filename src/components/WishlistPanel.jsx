import { useEffect } from "react";
import { categories } from "../data/books";
import { rupiah } from "../utils";

// Panel samping berisi Daftar Pilihan: bisa dilihat dan item bisa dihapus
export default function WishlistPanel({ buku, onClose, onHapus, onDetail }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex justify-end bg-black/60"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Daftar Pilihan"
        className="bg-amber-50 border-l-2 border-slate-900 w-full max-w-md h-full flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between border-b-2 border-slate-900 p-5">
          <h2 className="text-xl font-bold">Daftar Pilihan ({buku.length})</h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="text-2xl font-bold leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {buku.length === 0 ? (
            <p className="text-center text-slate-600 py-16">
              Belum ada buku yang dipilih. Buka detail buku lalu pilih
              &ldquo;Tambah ke Daftar Pilihan&rdquo;.
            </p>
          ) : (
            <ul className="space-y-4">
              {buku.map((b) => {
                const kategori = categories.find((c) => c.id === b.kategori_id);
                return (
                  <li
                    key={b.id}
                    className="flex gap-4 border-b border-amber-200 pb-4"
                  >
                    {b.cover_img && (
                      <img
                        src={b.cover_img}
                        alt=""
                        className="w-16 h-24 object-cover bg-slate-200 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold leading-snug">{b.judul}</h3>
                      <p className="text-sm text-gray-500">
                        {b.penulis} | {kategori?.nama_kategori}
                      </p>
                      <p className="text-sm mt-1">{rupiah(b.harga)}</p>
                      <div className="flex gap-3 mt-2 text-sm">
                        <button
                          onClick={() => onDetail(b)}
                          className="underline hover:text-amber-700"
                        >
                          Lihat detail
                        </button>
                        <button
                          onClick={() => onHapus(b)}
                          className="underline text-[#7B202B] hover:text-red-600"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}