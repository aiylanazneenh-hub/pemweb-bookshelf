// Penyimpanan data buku: dibaca dari server/data/books.json saat server menyala.
// Kalau file belum ada, dipakai data awal dari src/data/books.js.
// Setiap tambah/edit/hapus memanggil simpanBooks() supaya tersimpan ke file.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { books as bukuAwal, categories } from "../src/data/books.js";

const FOLDER = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "data");
const FILE = path.join(FOLDER, "books.json");

function muat() {
  try {
    const hasil = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    if (Array.isArray(hasil)) return hasil;
  } catch (e) {
    if (e.code !== "ENOENT") {
      console.error("books.json tidak bisa dibaca, memakai data awal:", e.message);
    }
  }
  return structuredClone(bukuAwal);
}

// Array ini diubah langsung (push/splice), jadi semua route yang mengimpornya selalu melihat data terbaru
export const books = muat();
export { categories };

export function simpanBooks() {
  fs.mkdirSync(FOLDER, { recursive: true });
  const sementara = FILE + ".tmp";
  fs.writeFileSync(sementara, JSON.stringify(books, null, 2));
  fs.renameSync(sementara, FILE); // tulis dulu ke file sementara agar file utama tidak rusak setengah jalan
}