import { useMemo } from "react";
import { books, categories } from "../data/books";
import BookCard from "./BookCard";

const judulUrutan = {
  terbaru: "Terbaru",
  termurah: "Harga termurah",
  termahal: "Harga termahal",
  judul: "Judul A-Z",
};

const inputClass = "border-2 border-slate-900 bg-white px-3 py-3";

export default function Katalog({ filter, setFilter, onReset, onDetail }) {
  const { kata, kategori, tahun, urut } = filter;

  // daftar tahun unik, dari yang terbaru
  const daftarTahun = useMemo(
    () => [...new Set(books.map((b) => b.tahun_terbit))].sort((a, b) => b - a),
    []
  );

  // pencarian + filter + sorting dihitung ulang setiap filter berubah
  const hasil = useMemo(() => {
    const q = kata.trim().toLowerCase();

    const list = books.filter((b) => {
      const cocokTeks =
        b.judul.toLowerCase().includes(q) || b.penulis.toLowerCase().includes(q);
      const cocokKategori = kategori === 0 || b.kategori_id === kategori;
      const cocokTahun = tahun === 0 || b.tahun_terbit === tahun;
      return cocokTeks && cocokKategori && cocokTahun;
    });

    list.sort((x, y) => {
      if (urut === "termurah") return x.harga - y.harga;
      if (urut === "termahal") return y.harga - x.harga;
      if (urut === "judul") return x.judul.localeCompare(y.judul);
      return y.created_at.localeCompare(x.created_at); // terbaru
    });

    return list;
  }, [kata, kategori, tahun, urut]);

  const ubah = (kunci, nilai) => setFilter({ ...filter, [kunci]: nilai });

  return (
    <section id="koleksi" className="py-12 grid gap-8 md:grid-cols-[220px_1fr]">
      {/* Sidebar kategori */}
      <aside>
        <h2 className="text-xl font-bold mb-3">Kategori</h2>
        <ul>
          {[{ id: 0, nama_kategori: "Semua" }, ...categories].map((c) => (
            <li key={c.id} className="border-b border-amber-200">
              <button
                onClick={() => ubah("kategori", c.id)}
                className={`w-full text-left py-3 ${
                  kategori === c.id
                    ? "font-bold border-l-4 border-amber-600 pl-3"
                    : "pl-4"
                }`}
              >
                {c.nama_kategori}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div>
        <h2 className="text-xl font-bold mb-4">{judulUrutan[urut]}</h2>

        <div className="grid gap-3 sm:grid-cols-3 mb-3">
          <input
            type="text"
            value={kata}
            onChange={(e) => ubah("kata", e.target.value)}
            placeholder="Cari judul atau penulis"
            className={`sm:col-span-3 ${inputClass} px-4`}
          />

          <select
            value={tahun}
            onChange={(e) => ubah("tahun", Number(e.target.value))}
            className={inputClass}
          >
            <option value={0}>Semua tahun</option>
            {daftarTahun.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={urut}
            onChange={(e) => ubah("urut", e.target.value)}
            className={inputClass}
          >
            {Object.entries(judulUrutan).map(([nilai, label]) => (
              <option key={nilai} value={nilai}>
                {label}
              </option>
            ))}
          </select>

          <button
            onClick={onReset}
            className="border-2 border-slate-900 px-3 py-3 font-bold hover:bg-slate-900 hover:text-[#F6F1E4]"
          >
            Reset filter
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Menampilkan {hasil.length} dari {books.length} buku
        </p>

        {hasil.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7 gap-y-10">
            {hasil.map((b) => (
              <BookCard key={b.id} book={b} onDetail={onDetail} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-600 py-16">
            Buku tidak ditemukan. Ubah kata kunci atau reset filter.
          </p>
        )}
      </div>
    </section>
  );
}