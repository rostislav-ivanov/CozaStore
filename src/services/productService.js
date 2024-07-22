const baseUrl = "http://localhost:3030/data/products";

export async function getAllProducts(category, page = 1, pageSize = 6) {
  const offset = (page - 1) * pageSize;
  const query = encodeURI(
    `select=_id,name,images,price&where=category LIKE "${category}"&offset=${offset}&pageSize=${pageSize}`
  );

  try {
    const response = await fetch(`${baseUrl}?${query}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductsCount(category) {
  const query = encodeURI(`where=category LIKE "${category}"&count`);
  try {
    const response = await fetch(`${baseUrl}?${query}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProductById(id) {
  const query = encodeURI(`select=_id,name,images,price,sizes,colors`);
  const response = await fetch(`${baseUrl}/${id}?${query}`);
  const data = await response.json();
  return data;
}

export async function getDetailsById(id) {
  const response = await fetch(`${baseUrl}/${id}`);
  const data = await response.json();
  return data;
}

export async function getWishListProducts(ids) {
  if (ids.length < 1) {
    return [];
  }
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken || !auth._id) {
      throw new Error("User is not logged in");
    }

    const query = encodeURI(
      `select=_id,name,images,price&where=_id IN (${ids
        .map((id) => `"${id}"`)
        .join(",")})`
    );

    const response = await fetch(`${baseUrl}?${query}`, {
      method: "GET",
      headers: {
        "X-Authorization": auth.accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    throw new Error(`Failed to get wishes: ${error.message}`);
  }
  //   const query = encodeURI(
  //     `select=_id,name,images,price&where=_id IN (${ids
  //       .map((id) => `"${id}"`)
  //       .join(",")})`
  //   );
  //   const response = await fetch(`${baseUrl}?${query}`, {
  //   }
  // )

  //   const data = await response.json();
  //   return Object.values(data);
}
