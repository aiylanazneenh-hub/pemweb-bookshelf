import { useCallback, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KategoriSection from "./components/KategoriSection";
import Katalog from "./components/Katalog";
import BookModal from "./components/BookModal";
import Footer from "./components/Footer";

const filterAwal = { kata: "", kategori: 0, tahun: 0, urut: "terbaru" };

export default function App() {
  const [filter, setFilter] = useState(filterAwal);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  const tutupModal = useCallback(() => setBukuDipilih(null), []);

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-5">
        <Hero />
        <KategoriSection
          onPilih={(id) => setFilter({ ...filterAwal, kategori: id })}
        />
        <Katalog
          filter={filter}
          setFilter={setFilter}
          onReset={() => setFilter(filterAwal)}
          onDetail={setBukuDipilih}
        />
      </main>

      <Footer />

      {bukuDipilih && <BookModal book={bukuDipilih} onClose={tutupModal} />}
    </>
  );
}