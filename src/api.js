const BASE = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Tidak bisa terhubung ke server. Pastikan backend sudah berjalan.");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // respons bukan JSON
  }

  if (!res.ok) {
    throw new Error(data?.pesan || `Permintaan gagal (${res.status})`);
  }
  return data;
}

export const kirimPesanChat = (pesan) =>
  request("/chat", { method: "POST", body: JSON.stringify({ pesan }) });