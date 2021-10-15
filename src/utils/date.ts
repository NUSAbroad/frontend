export const getMonthAndYear = (date: Date) => {
  return date.toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });
};
