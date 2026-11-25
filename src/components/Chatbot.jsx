import { useEffect, useRef, useState } from "react";
import { kirimPesanChat } from "../api";
import { rupiah } from "../utils";
import BookCover from "./BookCover";
import { useToast } from "./ui/Toast";

const pesanAwal = {
  id: 0,
  dari: "bot",
  teks: "Halo! Aku Boki, asisten Bookshelf, mau cari buku apa hari ini?",
  buku: [],
};

const batas = (angka, min, max) => Math.max(min, Math.min(angka, max));

function KartuBuku({ book, onDetail }) {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-2 mt-2 shadow-sm">
      <BookCover
        book={book}
        className="w-14 shrink-0 overflow-hidden rounded-lg [&>p]:hidden"
      />
      <div className="min-w-0 text-sm">
        <p className="font-bold leading-tight">{book.judul}</p>
        <p className="text-xs text-gray-500">{book.penulis}</p>
        <p className="mt-1">{rupiah(book.harga)}</p>
        <button
          onClick={() => onDetail(book)}
          className="mt-1 text-xs font-bold bg-slate-800 text-[#F6F1E4] hover:bg-slate-700 rounded-full px-3 py-1 shadow-sm"
        >
          Lihat detail
        </button>
      </div>
    </div>
  );
}

export default function Chatbot({ onDetail }) {
  const toast = useToast();
  const [buka, setBuka] = useState(false);
  const [pesan, setPesan] = useState([pesanAwal]);
  const [input, setInput] = useState("");
  const [mengetik, setMengetik] = useState(false);
  const idRef = useRef(1);
  const kotakRef = useRef(null);

  const [pos, setPos] = useState({
    x: Math.max(8, window.innerWidth - 404),
    y: Math.max(8, window.innerHeight - 608),
  });

  const geserRef = useRef(null);

  useEffect(() => {
    if (kotakRef.current) {
      kotakRef.current.scrollTop = kotakRef.current.scrollHeight;
    }
  }, [pesan, mengetik, buka]);

  const tambah = (pesanBaru) => {
    const id = idRef.current++;
    setPesan((p) => [...p, { id, ...pesanBaru }]);
  };

  async function kirim(e) {
    e.preventDefault();
    const teks = input.trim();
    if (!teks || mengetik) return;

    tambah({ dari: "user", teks });
    setInput("");
    setMengetik(true);

    try {
      const data = await kirimPesanChat(teks);
      tambah({ dari: "bot", teks: data.balasan, buku: data.buku ?? [] });
    } catch (err) {
      toast(err.message, "error");
      tambah({
        dari: "bot",
        teks: "Maaf, aku sedang tidak bisa menjawab. Coba lagi sebentar ya 🥺",
        buku: [],
      });
    } finally {
      setMengetik(false);
    }
  }

  function mulaiGeser(e) {
    if (e.target.closest("button")) return; // klik tombol jangan dianggap geser
    geserRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function saatGeser(e) {
    if (!geserRef.current) return;
    setPos({
      x: batas(e.clientX - geserRef.current.dx, 0, window.innerWidth - 100),
      y: batas(e.clientY - geserRef.current.dy, 0, window.innerHeight - 50),
    });
  }

  function selesaiGeser() {
    geserRef.current = null;
  }

  return (
    <>
      {buka && (
        <div
          style={{ left: pos.x, top: pos.y }}
          className="fixed z-[55] flex flex-col overflow-hidden resize
            bg-amber-50 border border-amber-200 rounded-3xl
            shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)]
            w-[calc(100vw-1rem)] sm:w-96 h-[32rem]
            min-w-[18rem] min-h-[20rem]
            max-w-[calc(100vw-1rem)] max-h-[calc(100vh-1rem)]"
        ><div
            onPointerDown={mulaiGeser}
            onPointerMove={saatGeser}
            onPointerUp={selesaiGeser}
            className="bg-slate-800 text-[#F6F1E4] px-4 py-3 flex items-center justify-between cursor-move select-none touch-none shadow-md shadow-slate-900/20"
          >
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-[#F6F1E4] flex items-center justify-center text-xl shadow-inner">
                🐰
              </span>
              <div className="leading-tight">
                <p className="font-bold">Boki</p>
                <p className="text-xs opacity-80">Asisten Bookshelf</p>
              </div>
            </div>
            <button
              onClick={() => setBuka(false)}
              aria-label="Tutup chat"
              className="h-8 w-8 rounded-full bg-white/15 hover:bg-white/25 text-lg leading-none"
            >
              &times;
            </button>
          </div>

          {/* Daftar pesan */}
          <div
            ref={kotakRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
          >
            {pesan.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.dari === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 text-sm rounded-2xl ${
                    m.dari === "user"
                      ? "bg-slate-800 text-[#F6F1E4] rounded-br-md shadow-md shadow-slate-900/15"
                      : "bg-white border border-amber-100 rounded-bl-md shadow-md shadow-amber-900/10"
                  }`}
                >
                  <p>{m.teks}</p>
                  {m.buku?.map((b) => (
                    <KartuBuku key={b.id} book={b} onDetail={onDetail} />
                  ))}
                </div>
              </div>
            ))}

            {/* Indikator mengetik */}
            {mengetik && (
              <div className="flex justify-start">
                <div className="bg-white border border-amber-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1 shadow-md shadow-amber-900/10">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-2 w-2 rounded-full bg-slate-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kolom ketik pesan */}
          <form
            onSubmit={kirim}
            className="flex gap-2 p-3 bg-white shadow-[0_-6px_16px_rgba(15,23,42,0.06)]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pesan..."
              className="flex-1 min-w-0 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm shadow-inner outline-none focus:border-slate-500"
            />
            <button
              type="submit"
              disabled={mengetik || !input.trim()}
              className="rounded-full bg-slate-800 hover:bg-slate-700 text-[#F6F1E4] px-4 font-bold shadow-md shadow-slate-900/25 disabled:opacity-50"
            >
              Kirim
            </button>
          </form>
        </div>
      )}

      {/* Tombol melayang */}
      <button
        onClick={() => setBuka(!buka)}
        aria-label={buka ? "Tutup chatbot" : "Buka chatbot"}
        className="fixed bottom-5 right-5 z-[55] h-14 w-14 rounded-full bg-slate-800 hover:bg-slate-700 text-2xl text-[#F6F1E4] shadow-xl shadow-slate-900/30 transition hover:-translate-y-0.5"
      >
        {buka ? "×" : "🐰"}
      </button>
    </>
  );
}