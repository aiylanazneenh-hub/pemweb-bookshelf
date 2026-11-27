// GET /api/books?q=&kategori=&tahun=&sort=
// GET /api/categories
// POST /api/books/:id (CRUD ADMIN)
// DELETE /api/books/:id (CRUD ADMIN)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";
import { books, categories, simpanBooks } from "../store.js";

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

// ===== CRUD buku (dipakai admin.html) =====
// Catatan: data disimpan di memori (array books), jadi kembali ke awal saat server restart.
function validasiBuku(body) {
  const errors = {};
  const judul = String(body.judul ?? "").trim();
  const penulis = String(body.penulis ?? "").trim();
  const kategori_id = Number(body.kategori_id);
  const harga = Number(body.harga);
  const stok = Number(body.stok);
  const tahun_terbit = Number(body.tahun_terbit);
  const tahunMaks = new Date().getFullYear() + 1;

  if (!judul) errors.judul = "Judul wajib diisi.";
  if (!penulis) errors.penulis = "Penulis wajib diisi.";
  if (!categories.some((k) => k.id === kategori_id)) errors.kategori_id = "Kategori tidak valid.";
  if (!Number.isInteger(harga) || harga < 0) errors.harga = "Harga harus bilangan bulat 0 atau lebih.";
  if (!Number.isInteger(stok) || stok < 0) errors.stok = "Stok harus bilangan bulat 0 atau lebih.";
  if (!Number.isInteger(tahun_terbit) || tahun_terbit < 1000 || tahun_terbit > tahunMaks)
    errors.tahun_terbit = `Tahun terbit harus antara 1000 dan ${tahunMaks}.`;

  return {
    errors,
    data: {
      judul,
      penulis,
      kategori_id,
      harga,
      stok,
      tahun_terbit,
      deskripsi: String(body.deskripsi ?? "").trim(),
    },
  };
}

// Gambar cover unggahan admin disimpan di public/img (otomatis dilayani Vite sebagai /img/...)
const IMG_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public/img");
const MAKS_GAMBAR = 3 * 1024 * 1024;
const EKSTENSI = { jpeg: "jpg", png: "png", webp: "webp" };

// Mengembalikan { url } kalau berhasil, atau { error } kalau data gambar tidak valid
function simpanCover(dataUrl) {
  const cocok = /^data:image\/(jpeg|png|webp);base64,/.exec(dataUrl);
  if (!cocok) return { error: "Format gambar harus PNG, JPG, atau WEBP." };
  const buf = Buffer.from(dataUrl.slice(cocok[0].length), "base64");
  if (buf.length === 0) return { error: "File gambar kosong." };
  if (buf.length > MAKS_GAMBAR) return { error: "Ukuran gambar maksimal 3 MB." };
  const nama = `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${EKSTENSI[cocok[1]]}`;
  fs.mkdirSync(IMG_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMG_DIR, nama), buf);
  return { url: `/img/${nama}` };
}

// Hanya menghapus file hasil unggahan admin (upload-*), bukan cover bawaan
function hapusCoverUnggahan(url) {
  if (!/^\/img\/upload-[\w.-]+$/.test(url || "")) return;
  try { fs.unlinkSync(path.join(IMG_DIR, path.basename(url))); } catch { /* sudah tidak ada */ }
}

const sekarang = () => new Date().toISOString().replace("T", " ").slice(0, 19);

router.post("/books", (req, res) => {
  const { errors, data } = validasiBuku(req.body || {});
  if (Object.keys(errors).length) {
    return res.status(400).json({ pesan: "Data buku tidak valid.", errors });
  }
  let cover_img = "";
  if (req.body.cover_data) {
    const hasil = simpanCover(req.body.cover_data);
    if (hasil.error) {
      return res.status(400).json({ pesan: "Data buku tidak valid.", errors: { cover_img: hasil.error } });
    }
    cover_img = hasil.url;
  }
  const buku = {
    id: books.reduce((maks, b) => Math.max(maks, b.id), 0) + 1,
    ...data,
    cover_img,
    created_at: sekarang(),
  };
  books.push(buku);
  simpanBooks();
  res.status(201).json({ success: true, data: buku, message: "Buku berhasil ditambahkan" });
});

router.put("/books/:id", (req, res) => {
  const buku = books.find((b) => b.id === Number(req.params.id));
  if (!buku) return res.status(404).json({ pesan: "Buku tidak ditemukan." });

  const { errors, data } = validasiBuku(req.body || {});
  if (Object.keys(errors).length) {
    return res.status(400).json({ pesan: "Data buku tidak valid.", errors });
  }
  if (req.body.cover_data) {
    const hasil = simpanCover(req.body.cover_data);
    if (hasil.error) {
      return res.status(400).json({ pesan: "Data buku tidak valid.", errors: { cover_img: hasil.error } });
    }
    hapusCoverUnggahan(buku.cover_img); // buang unggahan lama yang diganti
    buku.cover_img = hasil.url;
  }
  Object.assign(buku, data);
  simpanBooks();
  res.json({ success: true, data: buku, message: "Buku berhasil diperbarui" });
});

router.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ pesan: "Buku tidak ditemukan." });
  const [dihapus] = books.splice(index, 1);
  simpanBooks();
  hapusCoverUnggahan(dihapus.cover_img);
  res.json({ success: true, data: dihapus, message: "Buku berhasil dihapus" });
});

export default router;