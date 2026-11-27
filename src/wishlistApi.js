// src/wishlistApi.js
const getWishlistKey = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  const user = JSON.parse(userStr);
  // Kunci unik per user berdasarkan id atau email
  return `wishlist_user_${user.id || user.email}`;
};

export function getMyWishlist() {
  const key = getWishlistKey();
  if (!key) return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

export function saveMyWishlist(items) {
  const key = getWishlistKey();
  if (key) {
    localStorage.setItem(key, JSON.stringify(items));
  }
}