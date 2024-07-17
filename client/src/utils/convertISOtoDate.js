export default function formatDate(isoString) {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Extract the day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day}.${month}.${year}`;
}
