const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/products`;

export async function getAllProducts(category, page = 1, pageSize = 6) {
  const offset = (page - 1) * pageSize;

  const query = new URLSearchParams({
    offset,
    pageSize,
    category,
  });

  try {
    const response = await fetch(`${baseUrl}?${query}`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

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
  const query = new URLSearchParams({
    category,
  });

  try {
    const response = await fetch(`${baseUrl}/count?${query}`);

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
  const query = new URLSearchParams({
    select: "id,name,images,price,sizes,colors",
  });
  const response = await fetch(`${baseUrl}/${id}?${query}`);
  const data = await response.json();
  return data;
}

export async function getDetailsById(id) {
  const response = await fetch(`${baseUrl}/${id}`);
  const data = await response.json();
  return data;
}

export async function getWishListProducts() {
  console.log("getWishListProducts");
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (!auth || !auth.accessToken || !auth.id) {
      throw new Error("User is not logged in");
    }

    const response = await fetch(`${baseUrl}/user`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Object.values(data);
  } catch (error) {
    throw new Error(`Failed to get wishes: ${error.message}`);
  }
}
