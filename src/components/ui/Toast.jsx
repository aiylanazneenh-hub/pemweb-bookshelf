import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

const warna = {
  sukses: "bg-emerald-700",
  error: "bg-[#7B202B]",
  info: "bg-slate-900",
};

export function ToastProvider({ children }) {
  const [daftar, setDaftar] = useState([]);
  const idRef = useRef(0);

  const hapus = useCallback(
    (id) => setDaftar((d) => d.filter((t) => t.id !== id)),
    []
  );

  const toast = useCallback(
    (pesan, tipe = "info") => {
      const id = ++idRef.current;
      setDaftar((d) => [...d, { id, pesan, tipe }]);
      setTimeout(() => hapus(id), 3500);
    },
    [hapus]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        aria-live="polite"
        className="fixed top-20 right-4 z-[80] flex flex-col gap-2 w-72 max-w-[calc(100vw-2rem)]"
      >
        {daftar.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`${warna[t.tipe] ?? warna.info} text-white text-sm px-4 py-3 shadow-lg flex justify-between gap-3`}
          >
            <span>{t.pesan}</span>
            <button onClick={() => hapus(t.id)} aria-label="Tutup notifikasi">
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// pemakaian: const toast = useToast(); toast("Berhasil", "sukses");
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  return ctx;
}