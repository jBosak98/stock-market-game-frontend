function login(email: string, password: string) {
  //request for token
  localStorage.setItem("token", email);
}

export default login;
