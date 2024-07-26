const baseUrl = "https://cozastore-server.onrender.com/users";

export async function login({ email, password }) {
  const user = {
    email,
    password,
  };
  const response = await fetch(`${baseUrl}/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function register({ email, password }) {
  const user = {
    email,
    password,
  };
  const response = await fetch(`${baseUrl}/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function logout() {
  const auth = localStorage.getItem("auth");
  const authObj = JSON.parse(auth);
  const accessToken = authObj.accessToken;
  const response = await fetch(`${baseUrl}/logout`, {
    method: "get",
    headers: { "X-Authorization": accessToken },
  });
  return response.status === 204 ? "ok" : "error";
}
