const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/profiles`;

export async function getProfile() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken || !auth.id) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}

export async function updateProfile(profile) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to add wish: ${error.message}`);
  }
}

export async function validateToken() {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth) {
    return;
  }

  if (!auth.accessToken || !auth.id) {
    localStorage.removeItem("auth");
    localStorage.removeItem("wishes");
    localStorage.removeItem("bag");
    return;
  }

  try {
    const query = new URLSearchParams({
      where: `_ownerId="${auth.id}"`,
    });

    const response = await fetch(`${baseUrl}?${query}`, {
      method: "GET",
      headers: {
        "X-Authorization": auth.accessToken,
      },
    });
    if (!response.ok) {
      localStorage.removeItem("auth");
      localStorage.removeItem("wishes");
      localStorage.removeItem("bag");
      return;
    }
  } catch (error) {
    localStorage.removeItem("auth");
    localStorage.removeItem("wishes");
    localStorage.removeItem("bag");
  }
}
