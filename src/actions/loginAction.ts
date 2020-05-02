import axios from "axios";

async function login(email: string, password: string): Promise<boolean> {
  const data = { email, password };
  const response = await axios({
    method: "post",
    url: "http://0.0.0.0:8080/auth/login",
    data: { user: data },
  });
  localStorage.setItem("token", response.data.token);
  return response.status === 201;
}

export default login;
