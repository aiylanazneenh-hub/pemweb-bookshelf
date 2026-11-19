import { categories } from "../data/books";

export default function KategoriSection({ onPilih }) {
  return (
    <section id="kategori" className="py-12">
      <h2 className="text-2xl font-bold mb-4">Kategori</h2>
      <div className="flex flex-wrap gap-3">
        {categories
          .filter((c) => c.status_kategori === "aktif")
          .map((c) => (
            <a
              key={c.id}
              href="#koleksi"
              onClick={() => onPilih(c.id)}
              className="border-b border-amber-200 py-3 hover:text-amber-700"
            >
              {c.nama_kategori}
            </a>
          ))}
      </div>
    </section>
  );
}