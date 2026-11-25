// Bintang tampilan: nilai bisa desimal (mis. 4.3), diisi sebagian lewat lebar lapisan atas
export default function Stars({ nilai, className = "" }) {
  const persen = Math.max(0, Math.min(5, nilai)) * 20;

  return (
    <span
      role="img"
      aria-label={`Rating ${nilai.toFixed(1)} dari 5`}
      className={`relative inline-block leading-none tracking-wider ${className}`}
    >
      <span className="text-slate-300">★★★★★</span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-amber-500"
        style={{ width: `${persen}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}