const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/wishes`;

export async function getWish() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();

    const wishes = data.reduce((acc, wishId) => {
      acc[wishId] = true;
      return acc;
    }, {});

    return wishes;
  } catch (error) {
    throw new Error(`Failed to get wishes list: ${error.message}`);
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
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to add wishes: ${error.message}`);
  }
}
