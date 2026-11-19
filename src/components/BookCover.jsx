import { useState } from "react";
import { warnaBuku } from "../utils";

// Judul selalu tampil di sampul; kalau gambar gagal dimuat, yang terlihat blok warna + judul
export default function BookCover({ book, className = "", onClick, children }) {
  const [gagal, setGagal] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`relative aspect-[3/5] ${className}`}
      style={{ background: warnaBuku(book) }}
    >
      <p className="absolute bottom-4 left-4 right-4 text-lg text-[#E9D8A6]">
        {book.judul}
      </p>
      {book.cover_img && !gagal && (
        <img
          src={book.cover_img}
          alt={book.judul}
          onError={() => setGagal(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {children}
    </div>
  );
}