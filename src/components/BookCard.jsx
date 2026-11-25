import { categories } from "../data/books";
import { rupiah, statusStok } from "../utils";
import BookCover from "./BookCover";
import Stars from "./Stars";

export default function BookCard({ book, onDetail, ringkasan }) {
  const status = statusStok(book);
  const kategori = categories.find((c) => c.id === book.kategori_id);

  return (
    <article>
      <BookCover
        book={book}
        className="cursor-pointer"
        onClick={() => onDetail(book)}
      >
        {status === "habis" && (
          <span className="absolute top-2 right-2 bg-[#7B202B] text-white text-xs px-2 py-1">
            Habis
          </span>
        )}
        {status === "stok_terbatas" && (
          <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1">
            Stok terbatas
          </span>
        )}
      </BookCover>

      <h3 className="font-bold mt-4">{book.judul}</h3>
      <p className="text-sm text-gray-500">
        {book.penulis} | {kategori?.nama_kategori}
      </p>

      <div className="flex items-center gap-2 mt-1 text-sm">
        {ringkasan && ringkasan.jumlah > 0 ? (
          <>
            <Stars nilai={ringkasan.rata} />
            <span className="text-xs text-gray-500">
              {ringkasan.rata.toFixed(1)} ({ringkasan.jumlah})
            </span>
          </>
        ) : (
          <span className="text-xs text-gray-400">Belum ada ulasan</span>
        )}
      </div>

      <div className="border-t border-amber-200 mt-2 pt-2 text-sm">
        <span>{rupiah(book.harga)}</span>
        <br />
        <span className="text-xs text-gray-500">Sisa stok: {book.stok}</span>
      </div>

      <button
        onClick={() => onDetail(book)}
        className="mt-3 w-full border-2 border-slate-900 py-2 text-sm font-bold transition hover:bg-slate-900 hover:text-[#F6F1E4]"
      >
        Lihat detail
      </button>
    </article>
  );
}