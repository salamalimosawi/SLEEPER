export function login(username: string) {
  localStorage.setItem("codesleep_user", username);
  document.cookie = `codesleep_user=${username}; path=/`;
}

export function logout() {
  localStorage.removeItem("codesleep_user");
  document.cookie = "codesleep_user=; Max-Age=0; path=/";
}

export function getUser(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("codesleep_user");
}

export function isLoggedIn(): boolean {
  return !!getUser();
}