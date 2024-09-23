const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export async function login({ email, password }) {
  const user = {
    email,
    password,
  };

  const response = await fetch(`${baseUrl}/api/Account/login`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  return response;
}

export async function register({ email, password }) {
  const user = {
    email,
    password,
  };

  const response = await fetch(`${baseUrl}/api/Account/register`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
    credentials: "include",
  });

  return response;
}

export async function logout() {
  const response = await fetch(`${baseUrl}/api/Account/logout`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    credentials: "include",
  });
  return response;
}
