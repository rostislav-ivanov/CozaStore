const baseUrl = "https://cozastore-server.onrender.com/data/orders";

export async function createOrder(order) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": auth.accessToken,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}

export async function getOrders() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }

    const query = new URLSearchParams({
      where: `_ownerId="${auth._id}"`,
      sortBy: "_createdOn desc",
    });

    const queryString = query.toString().replace(/\+/g, "%20");

    const response = await fetch(`${baseUrl}?${queryString}`, {
      headers: {
        "X-Authorization": auth.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
}
