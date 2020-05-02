import axios from "axios";

async function register(data: { email: string; password: string }) {
  return axios({
    method: "post",
    url: "http://0.0.0.0:8080/auth/register",
    data: { user: data },
  });
}

export default register;
