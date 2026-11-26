import { useCallback, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Katalog from "./components/Katalog";
import BookModal from "./components/BookModal";
import WishlistPanel from "./components/WishlistPanel";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { useToast } from "./components/ui/Toast";
import { books } from "./data/books";
import {
  NAMA_USER_SEMENTARA,
  USER_ID_SEMENTARA,
  ulasanAwal,
} from "./data/reviews";
import { rataRating } from "./utils";

const filterAwal = { kata: "", kategori: 0, tahun: 0, urut: "terbaru" };

// "2025-03-10 19:40:00" (format sama dengan kolom created_at di database)
function sekarang() {
  const p = (n) => String(n).padStart(2, "0");
  const d = new Date();
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

export default function App() {
  const toast = useToast();
  const [filter, setFilter] = useState(filterAwal);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  // Data dummy: nanti diganti data dari API wishlist (Orang 4) dan ulasan (Orang 5).
  // wishlist: [{ id_wishlist, user_id, book_id }]
  const [wishlist, setWishlist] = useState([]);
  const [ulasan, setUlasan] = useState(ulasanAwal);
  const [panelBuka, setPanelBuka] = useState(false);

  const tutupModal = useCallback(() => setBukuDipilih(null), []);
  const tutupPanel = useCallback(() => setPanelBuka(false), []);

  // buku-buku di wishlist (urutan sesuai waktu ditambahkan)
  const bukuWishlist = useMemo(
    () =>
      wishlist
        .map((w) => books.find((b) => b.id === w.book_id))
        .filter(Boolean),
    [wishlist]
  );

  // { [book_id]: { rata, jumlah } } untuk bintang di kartu buku
  const ringkasanUlasan = useMemo(() => {
    const hasil = {};
    for (const b of books) {
      const milikBuku = ulasan.filter((u) => u.book_id === b.id);
      hasil[b.id] = { rata: rataRating(milikBuku), jumlah: milikBuku.length };
    }
    return hasil;
  }, [ulasan]);

  const tambahWishlist = (book) => {
    if (wishlist.some((w) => w.book_id === book.id)) {
      toast("Buku ini sudah ada di Daftar Pilihan", "info");
      return;
    }
    setWishlist((daftar) => [
      ...daftar,
      {
        id_wishlist: Date.now(),
        user_id: USER_ID_SEMENTARA,
        book_id: book.id,
      },
    ]);
    toast(`"${book.judul}" ditambahkan ke Daftar Pilihan`, "sukses");
  };

  const hapusWishlist = (book) => {
    setWishlist((daftar) => daftar.filter((w) => w.book_id !== book.id));
    toast(`"${book.judul}" dihapus dari Daftar Pilihan`, "info");
  };

  const kirimUlasan = ({ book_id, rating, komentar }) => {
    setUlasan((daftar) => [
      ...daftar,
      {
        id_review: Math.max(0, ...daftar.map((u) => u.id_review)) + 1,
        user_id: USER_ID_SEMENTARA,
        nama: NAMA_USER_SEMENTARA,
        book_id,
        rating,
        komentar,
        created_at: sekarang(),
      },
    ]);
    toast("Ulasan berhasil dikirim", "sukses");
  };

  return (
    <>
      <Navbar
        onLogin={() => toast("Fitur login belum tersedia", "info")}
        jumlahPilihan={wishlist.length}
        onBukaPilihan={() => setPanelBuka(true)}
      />

      <main className="max-w-6xl mx-auto px-5">
        <Hero />
        <Katalog
          filter={filter}
          setFilter={setFilter}
          onReset={() => setFilter(filterAwal)}
          onDetail={setBukuDipilih}
          ringkasanUlasan={ringkasanUlasan}
        />
      </main>

      <Footer />

      <Chatbot onDetail={setBukuDipilih} />

      {bukuDipilih && (
        <BookModal
          book={bukuDipilih}
          onClose={tutupModal}
          sudahDipilih={wishlist.some((w) => w.book_id === bukuDipilih.id)}
          onTambahPilihan={tambahWishlist}
          ulasan={ulasan.filter((u) => u.book_id === bukuDipilih.id)}
          onKirimUlasan={kirimUlasan}
        />
      )}

      {panelBuka && (
        <WishlistPanel
          buku={bukuWishlist}
          onClose={tutupPanel}
          onHapus={hapusWishlist}
          onDetail={(b) => {
            setPanelBuka(false);
            setBukuDipilih(b);
          }}
        />
      )}
    </>
  );
}