const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/econt`;

export async function getCities() {
  try {
    const response = await fetch(`${baseUrl}/cities`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cities = data.sort((a, b) => a.name.localeCompare(b.name));
    return cities;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getOffices(cityID) {
  try {
    const response = await fetch(`${baseUrl}/offices/${cityID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const offices = data.sort((a, b) => a.name.localeCompare(b.name));
    return offices;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
