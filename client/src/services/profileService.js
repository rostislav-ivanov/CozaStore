const baseUrl = "https://cozastore-server.onrender.com/data/profiles";

export async function createProfile(auth) {
  if (!auth || !auth.accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify({
        email: auth.email,
        firstName: "",
        lastName: "",
        phone: "",
        shippingCity: "",
        shippingOffice: "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to extend user: ${error.message}`);
  }
}

export async function getProfile() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
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

    const data = await response.json();
    if (data.length < 1) {
      throw new Error("User not found");
    }
    return data[0];
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

    const response = await fetch(`${baseUrl}/${profile._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify({ ...profile }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to add wish: ${error.message}`);
  }
}
