export const mapper = (str, type) => {
  if (type === "date") {
    if (str) {
      return new Date(str).toLocaleString();
    }
  }

  return str;
};