export const warnaCover = ["#13203F", "#7B202B", "#2D4F3F", "#4A3A28"];

export function rupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

export function warnaBuku(book) {
  return warnaCover[book.id % 4];
}

// status stok dihitung dari jumlah stok
export function statusStok(book) {
  if (book.stok <= 0) return "habis";
  if (book.stok <= 5) return "stok_terbatas";
  return "tersedia";
}