import { useEffect } from "react";
import { categories } from "../data/books";
import { rupiah } from "../utils";
import BookCover from "./BookCover";
import ReviewSection from "./ReviewSection";

export default function BookModal({
  book,
  onClose,
  sudahDipilih = false,
  onTambahPilihan,
  ulasan = [],
  onKirimUlasan,
}) {
  // Esc menutup modal & halaman di belakang tidak ikut scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const kategori = categories.find((c) => c.id === book.kategori_id);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="relative bg-amber-50 border-2 border-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-3 right-4 text-2xl font-bold"
        >
          &times;
        </button>

        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <BookCover book={book} />
          <div>
            <p className="text-amber-700 text-sm mb-1">{kategori?.nama_kategori}</p>
            <h2 className="text-2xl font-bold">{book.judul}</h2>
            <p className="text-gray-500 mb-4">oleh {book.penulis}</p>
            <p className="text-xl font-bold mb-4">{rupiah(book.harga)}</p>
            <p className="mb-4">{book.deskripsi}</p>
            <p className="text-sm text-slate-600">Tahun terbit: {book.tahun_terbit}</p>
            <p className="text-sm text-slate-600 mb-6">
              {book.stok <= 0 ? "Stok habis" : `Stok: ${book.stok}`}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onTambahPilihan(book)}
                disabled={sudahDipilih}
                className="border-2 border-slate-900 bg-slate-900 text-[#F6F1E4] px-5 py-3 font-bold hover:bg-amber-700 hover:border-amber-700 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-slate-900 disabled:hover:border-slate-900"
              >
                {sudahDipilih ? "Sudah di Daftar Pilihan" : "Tambah ke Daftar Pilihan"}
              </button>
              <button
                onClick={onClose}
                className="border-2 border-slate-900 px-5 py-3 font-bold hover:bg-slate-900 hover:text-[#F6F1E4]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>

        <ReviewSection bookId={book.id} ulasan={ulasan} onKirim={onKirimUlasan} />
      </div>
    </div>
  );
}