export const TOKEN_KEY = "access_token";

export function saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
    return localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // cek exp dari JWT jika ada
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      removeToken();
      return false;
    }

    return true;
  } catch (e) {
    removeToken();
    return false;
  }
}
