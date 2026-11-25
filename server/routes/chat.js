// Simpan sebagai: server/routes/chat.js
// Endpoint: POST /api/chat   body: { pesan: "..." }
// Balasan : { balasan: "teks", buku: [ ...maksimal 3 buku ] }
import { Router } from "express";
import { books, categories } from "../../src/data/books.js";

const router = Router();

/* ------------------------------------------------------------------
   DATA BALASAN TETAP
------------------------------------------------------------------ */
const obrolan = [
  { kata: ["halo", "hai", "hello", "hi"], balasan: "Halo! Mau cari buku apa hari ini? 😊" },
  { kata: ["makasih", "terima kasih", "thanks"], balasan: "Sama-sama! 😊" },
  { kata: ["apa kabar"], balasan: "Baik dong! Kamu gimana? 😄" },
  { kata: ["baik", "sehat", "alhamdulillah"], balasan: "Senang mendengarnya! 😊 Mau cari buku apa hari ini?" },
  { kata: ["siapa kamu"], balasan: "Aku Boki 🐰, asisten Bookshelf." },
  { kata: ["dadah", "bye"], balasan: "Dadah! Sampai jumpa lagi 👋" },
  { kata: ["oke", "ok", "siap", "sip"], balasan: "Siap! Ada lagi yang bisa kubantu? 😊" },
];

const teksBantuan =
  "Aku bisa bantu kamu:\n" +
  "• Cari buku: ketik judul, penulis, atau kategori\n" +
  "• Rekomendasi: \"rekomendasi komik\"\n" +
  "• Harga: \"harga sang eksekutor\"\n" +
  "• Termurah / termahal / terbaru\n" +
  "• Daftar kategori: \"kategori apa saja?\"";

// Kata yang tidak ikut dipakai saat mencari buku
const kataAbaikan = [
  "buku", "cari", "carikan", "tentang", "yang", "ada", "apa", "dong", "tolong", "mau",
  "saya", "aku", "untuk", "dan", "atau", "punya", "judul", "penulis", "karya", "dari",
  "ini", "itu", "ingin", "pengen", "pengin", "kasih", "kasi", "lihat", "tunjukkan",
  "bisa", "dengan", "buat", "harga", "berapa", "stok", "tersedia", "rekomendasi",
  "rekomen", "saran", "terbaru", "termurah", "termahal", "murah", "mahal", "kategori",
];

// Kata yang sering diketik pengguna tapi bukan nama kategori -> id kategori terkait
const aliasKategori = {
  novel: [1, 2], fiksi: [1, 2], cerita: [1, 2], romantis: [2], kartun: [19],
  pancasila: [5], negara: [5], bangsa: [5], pemerintahan: [5], demokrasi: [5], uud: [5],
  politik: [5], kewarganegaraan: [5],
  cpns: [6], kedinasan: [6], snbt: [6], utbk: [6], sbmptn: [6], ptn: [6], tryout: [6], skd: [6],
  skripsi: [7], penelitian: [7], metode: [7], riset: [7],
  ipa: [9], english: [10], grammar: [10], vocabulary: [10],
  komputer: [11, 12, 13], programming: [11], pemrograman: [11], coding: [11],
  uang: [15], finansial: [15], usaha: [17], bisnis: [15, 17], kantor: [17],
  agama: [14, 24], religi: [24], motivasi: [24],
};

/* ------------------------------------------------------------------
   FUNGSI BANTU
------------------------------------------------------------------ */
const rupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// Apakah kalimat memuat salah satu kata/frasa utuh? ("hai" tidak cocok dengan "thailand")
function memuat(pesan, daftarKata) {
  return daftarKata.some((kata) => new RegExp("\\b" + kata + "\\b").test(pesan));
}

// Balasan obrolan ringan, atau null kalau tidak ada yang cocok
function jawabObrolan(pesan) {
  const item = obrolan.find((o) => memuat(pesan, o.kata));
  return item ? item.balasan : null;
}

// Pecah kalimat menjadi kata kunci pencarian
function ambilKataKunci(pesan) {
  return pesan
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((kata) => kata.length >= 3 && !kataAbaikan.includes(kata));
}

// Teks yang dicari: judul + penulis + nama kategori (+ deskripsi kalau diminta)
function teksBuku(buku, denganDeskripsi = false) {
  const kategori = categories.find((k) => k.id === buku.kategori_id);
  let teks = buku.judul + " " + buku.penulis + " " + (kategori ? kategori.nama_kategori : "");
  if (denganDeskripsi) teks += " " + buku.deskripsi;
  return teks.toLowerCase();
}

// Cari buku berdasarkan kata kunci. Yang cocok semua kata diutamakan.
function cariBuku(pesan, denganDeskripsi = false) {
  const kunci = ambilKataKunci(pesan);
  if (kunci.length === 0) return [];

  const bernilai = books
    .map((buku) => ({ buku, skor: kunci.filter((k) => teksBuku(buku, denganDeskripsi).includes(k)).length }))
    .filter((x) => x.skor > 0)
    .sort((a, b) => b.skor - a.skor);

  const cocokSemua = bernilai.filter((x) => x.skor === kunci.length);
  return (cocokSemua.length > 0 ? cocokSemua : bernilai).map((x) => x.buku);
}

// Jarak edit: berapa huruf yang beda antara dua kata
function jarakEdit(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

// Apakah ada kata di pesan yang sama/mirip (typo kecil) dengan salah satu kata target?
function memuatMirip(pesan, daftarKata) {
  const kataPesan = pesan.replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  return daftarKata.some((target) =>
    kataPesan.some((kata) => {
      if (kata === target) return true;
      const batas = target.length >= 8 ? 2 : target.length >= 5 ? 1 : 0;
      return batas > 0 && jarakEdit(kata, target) <= batas;
    })
  );
}

// Cari kategori yang disebut pengguna (toleran typo)
function cariKategori(pesan) {
  const idAlias = Object.entries(aliasKategori)
    .filter(([kata]) => memuatMirip(pesan, [kata]))
    .flatMap(([, ids]) => ids);

  return categories.filter((k) => {
    const kataKategori = k.nama_kategori.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 4);
    return memuatMirip(pesan, kataKategori) || idAlias.includes(k.id);
  });
}

/* ------------------------------------------------------------------
   ENDPOINT
------------------------------------------------------------------ */
router.post("/", async (req, res) => {
  const pesan = (req.body.pesan || "").trim().toLowerCase();

  if (pesan === "") {
    return res.status(400).json({ pesan: "Pesan tidak boleh kosong" });
  }

  // jeda 0,7 detik supaya titik-titik "mengetik" sempat terlihat
  await new Promise((selesai) => setTimeout(selesai, 700));

  const jumlahKata = pesan.split(/\s+/).length;
  const kategoriCocok = cariKategori(pesan);
  const kandidat = kategoriCocok.length > 0
    ? books.filter((b) => kategoriCocok.some((k) => k.id === b.kategori_id))
    : books;

  // 1. Sapaan singkat ("halo", "terima kasih", ...)
  if (jumlahKata <= 2) {
    const balasan = jawabObrolan(pesan);
    if (balasan) return res.json({ balasan, buku: [] });
  }

  // 2. Bantuan
  if (memuat(pesan, ["bantuan", "help", "fitur", "bisa apa"])) {
    return res.json({ balasan: teksBantuan, buku: [] });
  }

  // 3. Daftar kategori
  if (memuat(pesan, ["kategori", "genre"]) && kategoriCocok.length === 0) {
    const daftar = categories.map((k) => "• " + k.nama_kategori).join("\n");
    return res.json({ balasan: "Kategori yang tersedia:\n" + daftar, buku: [] });
  }

  // 4. Termurah / termahal / terbaru (boleh digabung dengan kategori)
  if (memuat(pesan, ["termurah", "murah"])) {
    const hasil = [...kandidat].sort((a, b) => a.harga - b.harga).slice(0, 3);
    return res.json({ balasan: "Ini buku dengan harga paling terjangkau:", buku: hasil });
  }
  if (memuat(pesan, ["termahal", "mahal"])) {
    const hasil = [...kandidat].sort((a, b) => b.harga - a.harga).slice(0, 3);
    return res.json({ balasan: "Ini buku dengan harga tertinggi:", buku: hasil });
  }
  if (memuat(pesan, ["terbaru", "baru"])) {
    const hasil = [...kandidat].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 3);
    return res.json({ balasan: "Ini buku yang paling baru ditambahkan:", buku: hasil });
  }

  // 5. Tanya harga atau stok buku tertentu
  const tanyaHarga = memuat(pesan, ["harga", "berapa"]);
  const tanyaStok = memuat(pesan, ["stok", "tersedia"]);
  if (tanyaHarga || tanyaStok) {
    const cocok = cariBuku(pesan);
    if (cocok.length === 1) {
      const b = cocok[0];
      const balasan = tanyaStok
        ? `Stok "${b.judul}" tersisa ${b.stok} eksemplar.`
        : `Harga "${b.judul}" adalah ${rupiah(b.harga)}.`;
      return res.json({ balasan, buku: [b] });
    }
    if (cocok.length > 1) {
      return res.json({ balasan: "Ada beberapa buku yang cocok, ini yang teratas:", buku: cocok.slice(0, 3) });
    }
    return res.json({ balasan: "Buku yang mana? Sebutkan judulnya, mis. \"harga sang eksekutor\".", buku: [] });
  }

  // 6. Rekomendasi (per kategori kalau disebut, kalau tidak acak)
  if (memuat(pesan, ["rekomendasi", "rekomen", "saran"])) {
    const acak = [...kandidat].sort(() => Math.random() - 0.5).slice(0, 3);
    return res.json({ balasan: "Aku rekomendasikan ini untukmu:", buku: acak });
  }

  // 7. Cari buku (judul, penulis, atau kategori)
  const hasil = cariBuku(pesan);
  if (hasil.length > 0) {
    const tanyaAda = memuat(pesan, ["ada"]);
    const balasan =
      hasil.length > 3
        ? `Ada ${hasil.length} buku yang cocok. Ini 3 teratas:`
        : tanyaAda
          ? "Ada! Ini bukunya:"
          : "Ini buku yang mungkin cocok untukmu:";
    return res.json({ balasan, buku: hasil.slice(0, 3) });
  }

  // 8. Obrolan ringan di kalimat yang lebih panjang
  const balasanObrolan = jawabObrolan(pesan);
  if (balasanObrolan) return res.json({ balasan: balasanObrolan, buku: [] });

  // 9. Topik dikenali (mis. "novel", "pancasila") tapi tidak ada judul yang pas:
  //    tawarkan buku dari kategori yang terkait
  if (kategoriCocok.length > 0) {
    const namaKategori = kategoriCocok.slice(0, 2).map((k) => k.nama_kategori).join(" / ");
    return res.json({
      balasan: `Ini buku dari kategori ${namaKategori}:`,
      buku: kandidat.slice(0, 3),
    });
  }

  // 10. Kata kunci muncul di deskripsi buku
  const lewatDeskripsi = cariBuku(pesan, true);
  if (lewatDeskripsi.length > 0) {
    return res.json({
      balasan: "Tidak ada judul yang pas, tapi buku ini membahas hal yang mirip:",
      buku: lewatDeskripsi.slice(0, 3),
    });
  }

  // 11. Ada kata kunci, tapi memang tidak ada buku yang cocok
  const kunci = ambilKataKunci(pesan);
  if (kunci.length > 0) {
    return res.json({
      balasan: `Maaf, aku belum menemukan buku "${kunci.join(" ")}" di Bookshelf 😅 Coba kata kunci lain, atau ketik "kategori" untuk melihat kategori yang ada.`,
      buku: [],
    });
  }

  // 12. Pesan tidak dimengerti sama sekali
  res.json({
    balasan: "Maaf, aku belum paham 🥺 Coba ketik judul, penulis, atau kategori buku. Ketik \"bantuan\" untuk melihat yang bisa kutanyakan.",
    buku: [],
  });
});

export default router;