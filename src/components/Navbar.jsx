export default function Navbar({onLogin}) {
  const link = "hover:underline";
  return (
    <header className="bg-slate-900 text-[#F6F1E4] sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5">
        <a href="#beranda" className="text-2xl font-bold">
          BOOKSHELF
        </a>
        
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm sm:text-base">
          <a href="#beranda" className={link}>Beranda</a>
          <a href="#kategori" className={link}>Kategori</a>
          <a href="#koleksi" className={link}>Koleksi</a>
        </div>

        <button
          onClick={onLogin}
          className="bg-[#F6F1E4] text-slate-900 px-4 py-1.5 text-sm font-bold hover:bg-amber-200"
        >
          Login
        </button>
      </nav>
    </header>
  );
}