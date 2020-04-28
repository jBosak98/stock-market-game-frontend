function isLoggedIn(): boolean {
  return !!localStorage.getItem("token");
}

export default isLoggedIn;
