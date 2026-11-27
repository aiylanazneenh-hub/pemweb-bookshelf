import AuthStatus from "./AuthStatus";

export default function Navbar({ jumlahPilihan = 0, onBukaPilihan }) {
  const link = "hover:underline";
  return (
    <header className="bg-slate-900 text-[#F6F1E4] sticky top-0 z-50 border-b-2 border-slate-900">
      <nav className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4">
        
        {/* Logo / Judul */}
        <a href="#beranda" className="text-2xl font-serif font-bold tracking-wider">
          BOOKSHELF
        </a>

        {/* Menu Navigasi Tengah */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm sm:text-base font-medium">
          <a href="#beranda" className={link}>Beranda</a>
          <a href="#koleksi" className={link}>Koleksi</a>
        </div>

        {/* Tombol Buku Dipilih & AuthStatus di Kanan */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBukaPilihan}
            className="border-2 border-[#F6F1E4] px-4 py-1.5 text-sm font-bold bg-transparent text-[#F6F1E4] hover:bg-[#F6F1E4] hover:text-slate-900 transition-colors"
          >
            Buku Dipilih (<span data-testid="counter-pilihan">{jumlahPilihan}</span>)
          </button>
          
          <AuthStatus />
        </div>

      </nav>
    </header>
  );
}