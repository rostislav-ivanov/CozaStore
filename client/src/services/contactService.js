const baseUrl = "http://localhost:3030/jsonstore/messages";

export async function sendMessage(message) {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
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
