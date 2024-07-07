const baseUrl = "http://localhost:3030/data";

export async function getAllProducts(category) {
  // const query = new URLSearchParams({
  //   select: "_id,name,images,price",
  //   where: `category LIKE "${category}"`,
  // });

  try {
    const response = await fetch(
      `${baseUrl}/products?select=_id,name,images,price&where=category%20LIKE%20%22${category}%22`
    );
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
