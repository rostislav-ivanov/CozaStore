export default function formatValidationErrors(errors) {
  let errorMessage = "";

  for (const field in errors) {
    if (errors.hasOwnProperty(field)) {
      errorMessage += `${field}: ${errors[field].join(" ")}\n`;
    }
  }

  return errorMessage;
}
