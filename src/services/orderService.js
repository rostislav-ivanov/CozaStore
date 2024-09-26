const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/orders`;

export async function createOrder(order) {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken) {
      throw new Error("User is not logged in");
    }
    const response = await fetch(baseUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const orderNumber = await response.json();
    return orderNumber;
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

    const response = await fetch(baseUrl, {
      method: "get",
      credentials: "include",
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
