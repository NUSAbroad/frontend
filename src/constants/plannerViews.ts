export const View = {
  MAPPINGS: "MAPPINGS" as const,
  SIDE_BY_SIDE: "SIDE_BY_SIDE" as const,
};

export type View = typeof View[keyof typeof View];
