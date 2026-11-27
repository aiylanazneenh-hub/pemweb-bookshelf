import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authApi from "./authApi.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); 

  const openAuth = useCallback((mode = "login") => setModal(mode), []);

  const closeAuth = useCallback(() => {
    setModal(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("login")) {
      url.searchParams.delete("login");
      window.history.replaceState({}, "", url);
    }
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("login") === "1") {
      setModal("login");
    }

    if (!authApi.getToken()) {
      setLoading(false);
      return;
    }

    authApi
      .fetchMe()
      .then((data) => setUser(data.user ?? data))
      .catch(() => authApi.clearToken()) // token kedaluwarsa / tidak valid
      .finally(() => setLoading(false));
  }, []);

  const signIn = async ({ email, password }) => {
    const data = await authApi.login({ email, password });
    authApi.setToken(data.token);
    const me = await authApi.fetchMe();
    setUser(me.user ?? me);
  };

  const signUp = async ({ nama, email, password }) => {
    await authApi.register({ nama, email, password });
    await signIn({ email, password }); // langsung masuk setelah daftar
  };

  const signOut = () => {
    authApi.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, modal, openAuth, closeAuth, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}

