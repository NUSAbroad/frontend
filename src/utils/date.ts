export const getMonthAndYear = (date: Date) => {
  return date.toLocaleDateString("en-us", {
    month: "long",
    year: "numeric",
  });
};

export const getDayMonthAndYear = (date: Date) => {
  return date.toLocaleDateString("en-uk", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const getMostRecentDate = (mappings: Types.Mapping[]) => {
  if (mappings.length <= 0) {
    return;
  }

  // Sorts dates from newest to oldest
  const sortedMappings = [...mappings].sort((a, b) => {
    return -a.updatedAt.localeCompare(b.updatedAt);
  });

  return getDayMonthAndYear(new Date(sortedMappings[0].updatedAt));
};
