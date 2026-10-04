const TOKEN_KEY = "adminToken";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// True while a token is stored and its expiry time hasn't passed.
// This only reads the token; the server still checks its signature.
export const isLoggedIn = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload));
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
