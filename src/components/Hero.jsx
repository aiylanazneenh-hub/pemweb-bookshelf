export default function Hero() {
  return (
    <section
      id="beranda"
      className="py-16 border-b-4 border-double border-amber-600"
    >
      <p className="text-amber-700 tracking-widest uppercase text-sm mb-3">
        Koleksi pilihan
      </p>
      <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-6">
        "Bacaan berkualitas untuk pembaca yang cermat"
      </h1>
      <p className="text-lg max-w-xl mb-8">
        Temukan buku fiksi, non-fiksi, hingga pengembangan diri. <br />
        Cari, filter, dan lihat detail bacaan berikutnya!
      </p>
      <a
        href="#koleksi"
        className="inline-block bg-slate-900 border-2 border-slate-900 text-[#F6F1E4] px-6 py-3 font-bold transition hover:bg-black hover:border-black"
      >
        Jelajahi koleksi
      </a>
    </section>
  );
}