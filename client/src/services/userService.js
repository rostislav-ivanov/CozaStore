const baseUrl = "http://localhost:3030/data/user";

export async function extendUser(accessToken) {
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify({
        firstName: "",
        lastName: "",
        phone: "",
        wishList: {},
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

export async function getUser(auth) {
  try {
    if (!auth || !auth.accessToken || !auth._id) {
      throw new Error("User is not logged in");
    }

    const query = `?where=_ownerId%3D%22${auth._id}%22`;

    const response = await fetch(`${baseUrl}${query}`, {
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

export async function updateUser(user) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(`${baseUrl}/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify({ ...user }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to add wish: ${error.message}`);
  }
}
