const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/profiles`;

export async function getProfile() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw response.status;
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(profile) {
  try {
    const response = await fetch(baseUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile }),
      credentials: "include",
    });

    if (!response.ok) {
      throw response.status;
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}
