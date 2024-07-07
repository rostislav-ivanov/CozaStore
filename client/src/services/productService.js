const baseUrl = "http://localhost:3030/jsonstore";

export async function getProducts() {
  try {
    const response = await fetch(`${baseUrl}/products`);
    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export async function getProductById(id) {
  const response = await fetch(`${baseUrl}/products/${id}`);
  const data = await response.json();
  return data;
}