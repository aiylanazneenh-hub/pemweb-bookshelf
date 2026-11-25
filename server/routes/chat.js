import { Router } from "express";
import { books, categories } from "../../src/data/books.js";

const router = Router();

const obrolan = [
  { kata: ["halo", "hai", "hello"], balasan: "Halo! Mau cari buku apa hari ini? 😊" },
  { kata: ["makasih", "terima kasih", "thanks"], balasan: "Sama-sama! 😊" },
  { kata: ["apa kabar"], balasan: "Baik dong! Kamu gimana? 😄" },
  { kata: ["baik", "sehat", "alhamdulillah"], balasan: "Senang mendengarnya! 😊 Mau cari buku apa hari ini?" },
  { kata: ["siapa kamu"], balasan: "Aku Boki 🐰, asisten Bookshelf." },
  { kata: ["dadah", "bye"], balasan: "Dadah! Sampai jumpa lagi 👋" },
];

router.post("/", async (req, res) => {
  const pesan = (req.body.pesan || "").trim().toLowerCase();

  if (pesan === "") {
    return res.status(400).json({ pesan: "Pesan tidak boleh kosong" });
  }

  // jeda 0,7 detik titik-titik "mengetik" 
  await new Promise((selesai) => setTimeout(selesai, 700));

  // 1. Cek obrolan ringan
  for (const item of obrolan) {
    for (const kata of item.kata) {
      if (pesan.includes(kata)) {
        return res.json({ balasan: item.balasan, buku: [] });
      }
    }
  }

  // 2. Cari buku (judul, penulis, atau kategori)
  let hasil = [];
  if (pesan.includes("populer")) {
    hasil = books.filter((buku) => buku.populer === "ya");
  } else if (pesan.length >= 3) {
    hasil = books.filter((buku) => {
      const kategori = categories.find((k) => k.id === buku.kategori_id);
      const teksBuku = buku.judul + " " + buku.penulis + " " + kategori.nama_kategori;
      return teksBuku.toLowerCase().includes(pesan);
    });
  }

  if (hasil.length > 0) {
    return res.json({
      balasan: "Ini buku yang mungkin cocok untukmu:",
      buku: hasil.slice(0, 3),
    });
  }

  // 3. Tidak ada yang cocok
  res.json({
    balasan: "Maaf, aku belum paham 🥺 Coba ketik judul, penulis, atau kategori buku.",
    buku: [],
  });
});

export default router;