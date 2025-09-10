// For ordinal suffix: "st", "nd", "th", etc.
export function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// Converts "1447" -> "١٤٤٧"
export function convertToArabicNumbers(num) {
  return num
    .toString()
    .split("")
    .map((digit) => String.fromCharCode(0x0660 + parseInt(digit)))
    .join("");
}
