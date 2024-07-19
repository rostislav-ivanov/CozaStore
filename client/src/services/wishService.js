const baseUrl = "http://localhost:3030/data/wish";

export async function createWish(auth) {
  try {
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify({
        wishList: {},
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to create wish list: ${error.message}`);
  }
}

export async function getWish(auth) {
  try {
    if (!auth || !auth.accessToken || !auth._id) {
      throw new Error("User is not logged in");
    }

    const query = new URLSearchParams({
      where: `_ownerId="${auth._id}"`,
    });

    const response = await fetch(`${baseUrl}?${query}`, {
      method: "GET",
      headers: {
        "X-Authorization": auth.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();
    if (data.length < 1) {
      throw new Error("Wish list not found");
    }

    return data[0];
  } catch (error) {
    throw new Error(`Failed to get wish list: ${error.message}`);
  }
}

export async function updateWish(wish) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(`${baseUrl}/${wish._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify({ ...wish }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to add wish: ${error.message}`);
  }
}
