import { useState } from "react";
import { rataRating, tanggalIndonesia } from "../utils";
import Stars from "./Stars";

const MAKS_KOMENTAR = 500;

export default function ReviewSection({ bookId, ulasan, onKirim }) {
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [error, setError] = useState({});

  const rata = rataRating(ulasan);
  const terurut = [...ulasan].sort(
    (a, b) =>
      b.created_at.localeCompare(a.created_at) || b.id_review - a.id_review
  );

  const kirim = (e) => {
    e.preventDefault();
    const teks = komentar.trim();
    const baru = {};
    if (rating < 1 || rating > 5) baru.rating = "Pilih bintang 1 sampai 5.";
    if (teks === "") baru.komentar = "Komentar tidak boleh kosong.";
    else if (teks.length > MAKS_KOMENTAR)
      baru.komentar = `Komentar maksimal ${MAKS_KOMENTAR} karakter.`;

    setError(baru);
    if (Object.keys(baru).length > 0) return;

    onKirim({ book_id: bookId, rating, komentar: teks });
    setRating(0);
    setKomentar("");
  };

  return (
    <section className="mt-8 border-t-2 border-slate-900 pt-6" aria-label="Ulasan">
      <h3 className="text-xl font-bold mb-2">Ulasan</h3>

      <div className="flex items-center gap-3 mb-5">
        {ulasan.length > 0 ? (
          <>
            <span className="text-3xl font-bold">{rata.toFixed(1)}</span>
            <Stars nilai={rata} className="text-2xl" />
            <span className="text-sm text-slate-600">
              dari {ulasan.length} ulasan
            </span>
          </>
        ) : (
          <span className="text-slate-600">Belum ada ulasan.</span>
        )}
      </div>

      <ul className="space-y-4 mb-6">
        {terurut.map((u) => (
          <li key={u.id_review} className="border-b border-amber-200 pb-3">
            <div className="flex flex-wrap items-center gap-x-3">
              <span className="font-bold">{u.nama}</span>
              <Stars nilai={u.rating} className="text-sm" />
              <span className="text-xs text-slate-500">
                {tanggalIndonesia(u.created_at)}
              </span>
            </div>
            <p className="mt-1 text-slate-800 break-words">{u.komentar}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={kirim} noValidate>
        <h4 className="font-bold mb-2">Tulis ulasan</h4>

        <div
          role="radiogroup"
          aria-label="Beri bintang"
          className="flex gap-1 text-3xl leading-none"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} bintang`}
              onClick={() => setRating(n)}
              className={n <= rating ? "text-amber-500" : "text-slate-300"}
            >
              ★
            </button>
          ))}
        </div>
        {error.rating && (
          <p role="alert" className="text-sm text-[#7B202B] mt-1">
            {error.rating}
          </p>
        )}

        <textarea
          value={komentar}
          onChange={(e) => setKomentar(e.target.value)}
          rows={3}
          placeholder="Tulis komentarmu tentang buku ini"
          aria-label="Komentar"
          className="mt-3 w-full border-2 border-slate-900 bg-white px-3 py-2"
        />
        {error.komentar && (
          <p role="alert" className="text-sm text-[#7B202B] mt-1">
            {error.komentar}
          </p>
        )}

        <button
          type="submit"
          className="mt-3 border-2 border-slate-900 bg-slate-900 text-[#F6F1E4] px-5 py-2 font-bold hover:bg-amber-700 hover:border-amber-700"
        >
          Kirim ulasan
        </button>
      </form>
    </section>
  );
}
