const apiUrl = "http://localhost:3030/users";

export async function login({ email, password }) {
  const user = {
    email,
    password,
  };
  const response = await fetch(`${apiUrl}/login`, {
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
  const response = await fetch(`${apiUrl}/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function logout() {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${apiUrl}/logout`, {
    method: "get",
    headers: { "X-Authorization": accessToken },
  });
  return response.status === 204 ? "ok" : "error";
}
