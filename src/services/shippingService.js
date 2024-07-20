const baseUrl =
  "https://demo.econt.com/ee/services/Nomenclatures/NomenclaturesService";
const credentials = btoa("iasp-dev:1Asp-dev");
const countryCode = "BGR";

export async function getCities() {
  const url = `${baseUrl}.getCities.json`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      countryCode,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const cities = Object.values(data)[0]
      .filter((city) => city.expressCityDeliveries)
      .map((city) => ({
        id: city.id,
        name: city.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return cities;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getOffices(cityID) {
  const url = `${baseUrl}.getOffices.json`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      countryCode,
      cityID,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const offices = Object.values(data)[0]
      .map((office) => ({
        id: office.id,
        name: `${office.name} (${office.address.street} ${office.address.num})`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return offices;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
