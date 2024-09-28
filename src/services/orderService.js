const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/orders`;

export async function createOrder(order) {
  try {
    const response = await fetch(baseUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      credentials: "include",
    });

    if (!response.ok) {
      throw response.status;
    }

    const orderNumber = await response.json();
    return orderNumber;
  } catch (error) {
    throw error;
  }
}

export async function getOrders() {
  try {
    const response = await fetch(baseUrl, {
      method: "get",
      credentials: "include",
    });

    if (!response.ok) {
      throw response.status;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
