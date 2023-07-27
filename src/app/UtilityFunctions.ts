export function LowerCaseString(input: any) {
  // Check if the input is a string
  if (typeof input !== "string") {
    console.log("not a string");
  }

  // Convert the string to lowercase and return it
  return input.toLowerCase();
}

export function ToCamelCase(str: string): string {
  return str
    .replace(/[^\w\s]|_/g, " ") // Replace non-alphanumeric characters with spaces
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s(.)/g, (_, match) => match.toUpperCase()) // Convert the first letter after each space to uppercase
    .replace(/\s/g, "") // Remove all spaces
    .replace(/^(.)/, (_, match) => match.toLowerCase()); // Convert the first letter to lowercase
}
