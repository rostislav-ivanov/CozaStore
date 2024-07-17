const baseUrl = "http://localhost:3030/data/orders";

export async function createOrder(order) {
  try {
    const auth = localStorage.getItem("auth");
    const authObj = JSON.parse(auth);
    const accessToken = authObj.accessToken;
    if (!accessToken) {
      throw new Error("User is not logged in");
    }
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
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
    const auth = localStorage.getItem("auth");
    const authObj = JSON.parse(auth);
    const accessToken = authObj.accessToken;
    if (!accessToken) {
      throw new Error("User is not logged in");
    }

    const query = encodeURI("sortBy=_createdOn desc");

    const response = await fetch(`${baseUrl}?${query}`, {
      headers: {
        "X-Authorization": accessToken,
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
