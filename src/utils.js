export const warnaCover = ["#13203F", "#7B202B", "#2D4F3F", "#4A3A28"];

export function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

export function warnaBuku(book) {
  return warnaCover[book.id % 4];
}

export function statusStok(book) {
  if (book.stok <= 0) return "habis";
  if (book.stok <= 5) return "stok_terbatas";
  return "tersedia";
}

export function rataRating(ulasan) {
  if (!ulasan || ulasan.length === 0) return 0;
  return ulasan.reduce((total, u) => total + u.rating, 0) / ulasan.length;
}

export function tanggalIndonesia(teks) {
  const d = new Date(teks.replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return teks;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}