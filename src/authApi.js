const TOKEN_KEY = "token";
const USER_KEY = "user";

const DUMMY_USERS = [
  { id: 1, nama: "Admin", email: "admin@perpus.com", password: "123456", role: "admin" },
  { id: 2, nama: "Budi", email: "budi@gmail.com", password: "123456", role: "user" }
];

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export async function login(body) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailInput = body.email.trim().toLowerCase();
      const passInput = body.password.trim();
      
      const user = DUMMY_USERS.find((u) => u.email === emailInput && u.password === passInput);

      if (user) {
        const dummyToken = "mock-jwt-token-" + Math.random().toString(36).substring(7);
        const { password: _, ...safeUser } = user;
        setToken(dummyToken);
        localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
        resolve({ token: dummyToken, user: safeUser });
      } else {
        reject(new Error("Email atau password salah atau tidak terdaftar, coba lagi"));
      }
    }, 300);
  });
}

export async function register(body) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const emailInput = body.email.trim().toLowerCase();
      const existing = DUMMY_USERS.find((u) => u.email === emailInput);
      
      if (existing) {
        reject(new Error("Email sudah terdaftar!"));
      } else {
        const newUser = { 
          id: DUMMY_USERS.length + 1, 
          nama: body.nama.trim(), 
          email: emailInput, 
          password: body.password, 
          role: "user" 
        };
        DUMMY_USERS.push(newUser);
        const dummyToken = "mock-jwt-token-" + Math.random().toString(36).substring(7);
        const { password: _, ...safeUser } = newUser;
        setToken(dummyToken);
        localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
        resolve({ token: dummyToken, user: safeUser });
      }
    }, 300);
  });
}

export async function fetchMe() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = getToken();
      const userStr = localStorage.getItem(USER_KEY);
      if (token && userStr) {
        resolve({ user: JSON.parse(userStr) });
      } else {
        reject(new Error("Belum login."));
      }
    }, 150);
  });
}