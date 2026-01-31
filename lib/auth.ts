export function login(username: string) {
  localStorage.setItem("codesleep_user", username);
}

export function logout() {
  localStorage.removeItem("codesleep_user");
}

export function getUserId(): string {
  const user = localStorage.getItem("codesleep_user");
  if (!user) {
    throw new Error("User not logged in");
  }
  return user;
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("codesleep_user");
}