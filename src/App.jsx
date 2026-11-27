import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Katalog from "./components/Katalog";
import BookModal from "./components/BookModal";
import WishlistPanel from "./components/WishlistPanel";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import AuthModal from "./components/AuthModal";
import { AuthProvider, useAuth } from "./AuthContext";
import { useToast } from "./components/ui/Toast";
import { books as bukuAwal} from "./data/books";
import { ambilBuku } from "./api";
import {
  NAMA_USER_SEMENTARA,
  USER_ID_SEMENTARA,
  ulasanAwal,
} from "./data/reviews";
import { rataRating } from "./utils";

const filterAwal = { kata: "", kategori: 0, tahun: 0, urut: "terbaru" };

function sekarang() {
  const p = (n) => String(n).padStart(2, "0");
  const d = new Date();
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

function AppIsi() {
  const toast = useToast();
  const { user, openAuth } = useAuth();
  const userId = user ? String(user.id || user.email) : null;

  const [filter, setFilter] = useState(filterAwal);
  const [bukuDipilih, setBukuDipilih] = useState(null);

  const [wishlist, setWishlist] = useState([]);
  const [ulasan, setUlasan] = useState(ulasanAwal);
  const [panelBuka, setPanelBuka] = useState(false);

  const tutupModal = useCallback(() => setBukuDipilih(null), []);
  const tutupPanel = useCallback(() => setPanelBuka(false), []);

  // Logout -> semua wishlist dikosongkan (belum disimpan ke Supabase)
  useEffect(() => {
    if (!user) setWishlist([]);
  }, [user]);

  // Hanya wishlist milik user yang sedang login
  const wishlistUser = useMemo(
    () => (userId ? wishlist.filter((w) => w.user_id === userId) : []),
    [wishlist, userId]
  );

  const bukuWishlist = useMemo(
    () =>
      wishlistUser
        .map((w) => books.find((b) => b.id === w.book_id))
        .filter(Boolean),
    [wishlistUser]
  );

  const ringkasanUlasan = useMemo(() => {
    const hasil = {};
    for (const b of books) {
      const milikBuku = ulasan.filter((u) => u.book_id === b.id);
      hasil[b.id] = { rata: rataRating(milikBuku), jumlah: milikBuku.length };
    }
    return hasil;
  }, [ulasan]);

  const tambahWishlist = (book) => {
    // Wajib login dulu
    if (!user) {
      toast("Login dulu untuk menambah buku ke Daftar Pilihan", "info");
      openAuth("login");
      return;
    }
    if (wishlistUser.some((w) => w.book_id === book.id)) {
      toast("Buku ini sudah ada di Daftar Pilihan", "info");
      return;
    }
    setWishlist((daftar) => [
      ...daftar,
      {
        id_wishlist: Date.now(),
        user_id: userId,
        book_id: book.id,
      },
    ]);
    toast(`"${book.judul}" ditambahkan ke Daftar Pilihan`, "sukses");
  };

  const hapusWishlist = (book) => {
    setWishlist((daftar) =>
      daftar.filter((w) => !(w.book_id === book.id && w.user_id === userId))
    );
    toast(`"${book.judul}" dihapus dari Daftar Pilihan`, "info");
  };

  // Dipakai panel samping dan profil: tutup panel, lalu buka detail buku
  const bukaDetailDariPilihan = (b) => {
    setPanelBuka(false);
    setBukuDipilih(b);
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
        jumlahPilihan={wishlistUser.length}
        onBukaPilihan={() => setPanelBuka(true)}
        wishlist={bukuWishlist}
        onHapus={hapusWishlist}
        onDetail={bukaDetailDariPilihan}
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
          sudahDipilih={wishlistUser.some((w) => w.book_id === bukuDipilih.id)}
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
          onDetail={bukaDetailDariPilihan}
        />
      )}

      <AuthModal />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppIsi />
    </AuthProvider>
  );
}