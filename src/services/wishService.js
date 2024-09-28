const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/wishes`;

export async function getWish() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw response.status;
    }

    let data = await response.json();

    const wishes = data.reduce((acc, wishId) => {
      acc[wishId] = true;
      return acc;
    }, {});

    return await wishes;
  } catch (error) {
    throw error;
  }
}

export async function updateWish(wishData) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.keys(wishData)),
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
