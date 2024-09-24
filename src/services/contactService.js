const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/contacts`;

export async function sendMessage(message) {
  try {
    const response = await fetch(`${baseUrl}/messages`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to send message: ${error.message}`);
  }
}

export async function subscribe(email) {
  try {
    const response = await fetch(`${baseUrl}/subscribers`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(`Failed to subscribe: ${error.message}`);
  }
}
