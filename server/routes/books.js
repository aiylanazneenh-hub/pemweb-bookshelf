//   GET /api/books?q=&kategori=&tahun=&sort=
//   GET /api/categories
import { Router } from "express";
import { books, categories } from "../../src/data/books.js";

const router = Router();

// Pengganti tabel search_logs (sementara disimpan di memori)
const searchLogs = [];

router.get("/books", (req, res) => {
  const kata = (req.query.q || "").trim().toLowerCase();
  const kategori = Number(req.query.kategori) || 0; // 0 = semua kategori
  const tahun = Number(req.query.tahun) || 0; // 0 = semua tahun
  const urut = req.query.sort || "terbaru";

  // 1. Saring: kategori, tahun, dan kata kunci judul atau penulis (semua syarat harus cocok)
  const hasil = books.filter(
    (buku) =>
      (kategori === 0 || buku.kategori_id === kategori) &&
      (tahun === 0 || buku.tahun_terbit === tahun) &&
      (buku.judul.toLowerCase().includes(kata) ||
        buku.penulis.toLowerCase().includes(kata))
  );

  // 2. Urutkan
  if (urut === "termurah") {
    hasil.sort((a, b) => a.harga - b.harga);
  } else if (urut === "termahal") {
    hasil.sort((a, b) => b.harga - a.harga);
  } else if (urut === "judul") {
    hasil.sort((a, b) => a.judul.localeCompare(b.judul));
  } else {
    // terbaru: created_at paling baru di atas
    hasil.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  // 3. Catat pencarian (hanya kalau pengunjung benar-benar mengetik)
  if (kata !== "") {
    searchLogs.push({
      id_log: searchLogs.length + 1,
      user_id: null,
      keyword: kata,
      searched_at: new Date().toISOString(),
    });
  }

  res.json({ success: true, data: hasil, message: `${hasil.length} buku ditemukan` });
});

router.get("/categories", (req, res) => {
  res.json({ success: true, data: categories, message: "OK" });
});

export default router;