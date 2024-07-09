const baseUrl = "http://localhost:3030/data/products";

export async function getAllProducts(category, page = 1, pageSize = 6) {
  const offset = (page - 1) * pageSize;
  const query = encodeURI(
    `select=_id,name,images,price&where=category LIKE "${category}"&offset=${offset}&pageSize=${pageSize}`
  );

  try {
    const response = await fetch(`${baseUrl}?${query}`);
    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export async function getProductsCount(category) {
  const query = encodeURI(`where=category LIKE "${category}"&count`);
  try {
    const response = await fetch(`${baseUrl}?${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error.message);
  }
}

export async function getProductById(id) {
  const query = encodeURI(
    `select=_id,name,images,price,description,sizes,colors`
  );
  const response = await fetch(`${baseUrl}/${id}?${query}`);
  const data = await response.json();
  return data;
}
