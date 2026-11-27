(async function () {
document.documentElement.style.visibility = "hidden";

const toLogin = () => window.location.replace("/?login=1");
const token = localStorage.getItem("token");
const userStr = localStorage.getItem("user");

if (!token || !userStr) return toLogin();

try {
    // --- MODE DUMMY (Sementara sebelum backend /api/me siap) ---
    const user = JSON.parse(userStr);
    if (user.role !== "admin") return toLogin();

    // --- NANTI KALAU BACKEND SUDAH JADI, PAKAI YANG INI: ---
    // const res = await fetch("/api/me", {
    //   headers: { Authorization: "Bearer " + token },
    // });
    // if (!res.ok) return toLogin();
    // const data = await res.json();
    // const user = data.user || data;
    // if (user.role !== "admin") return toLogin();

    document.documentElement.style.visibility = "visible";
} catch {
    toLogin();
  }
})();