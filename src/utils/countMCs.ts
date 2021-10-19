export const countMCs = (mappings: Types.Mapping[]) => {
  return mappings
    .map((mapping) => mapping.nusModuleCredits)
    .reduce((a, b) => a + b, 0);
};
