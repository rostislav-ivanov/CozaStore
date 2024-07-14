const baseUrl = "http://localhost:3030/data/orders";

export async function createOrder(order) {
  const auth = localStorage.getItem("auth");
  const authObj = JSON.parse(auth);
  const accessToken = authObj.accessToken;
  if (!accessToken) {
    throw new Error("User is not logged in");
  }
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": accessToken,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}
