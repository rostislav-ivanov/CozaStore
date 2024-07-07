const baseUrl = "http://localhost:3030/data";

export async function getAllProducts(category, page = 1, pageSize = 6) {
  // const query = new URLSearchParams({
  //   select: "_id,name,images,price",
  //   where: `category LIKE "${category}"`,
  // });

  const offset = (page - 1) * pageSize;

  try {
    const response = await fetch(
      `${baseUrl}/products?select=_id,name,images,price&where=category%20LIKE%20%22${category}%22&offset=${offset}&pageSize=${pageSize}`
    );
    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export async function getProductsCount(category) {
  try {
    const response = await fetch(
      `${baseUrl}/products?where=category%20LIKE%20%22${category}%22&count`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export async function getProductById(id) {
  const response = await fetch(`${baseUrl}/products/${id}`);
  const data = await response.json();
  return data;
}
