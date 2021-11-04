export interface Theme {
  typeface: string;

  colors: {
    black: string;
    bistre: string;
    bistre50: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
    grey100: string;
    floralWhite: string;
    floralWhite30: string;
    babyPowder: string;
    blueCrayola: string;
    blueCrayola50: string;
    blueCrayola10: string;
    orangeSoda: string;
    orangeSoda50: string;
    saffron: string;
    saffron50: string;
    saffron10: string;
  };

  fontSizes: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  breakPoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

const theme: Theme = {
  typeface: "Space Grotesk, sans-serif",
  colors: {
    black: "#333333",
    bistre: "#33261D",
    bistre50: "rgba(51, 38, 29, 0.5)",
    grey500: "#665C53",
    grey400: "#999189",
    grey300: "#CCC6BF",
    grey200: "#F3EEE8",
    grey100: "#F9F5EF",
    floralWhite: "#FFFBF5",
    floralWhite30: "rgba(255, 251, 245, 0.3)",
    babyPowder: "#FFFDFA",
    blueCrayola: "#3772FF",
    blueCrayola50: "rgba(55, 114, 255, 0.5)",
    blueCrayola10: "rgba(55, 114, 255, 0.1)",
    orangeSoda: "#FC5130",
    orangeSoda50: "rgba(252, 81, 48, 0.5)",
    saffron: "#F0C62D",
    saffron50: "rgba(240, 198, 45, 0.5)",
    saffron10: "rgba(240, 198, 45, 0.1)",
  },
  fontSizes: {
    sm: "0.8rem",
    md: "1rem",
    lg: "1.563rem",
    xl: "1.953rem",
    xxl: "3.815rem",
  },
  breakPoints: {
    xs: "320px",
    sm: "425px",
    md: "768px",
    lg: "1024px",
  },
};

export default theme;
