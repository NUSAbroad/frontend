export interface Theme {
  typeface: string;

  colors: {
    bistre: string;
    grey500: string;
    grey400: string;
    grey300: string;
    grey200: string;
    grey100: string;
    floralWhite: string;
    babyPowder: string;
    blueCrayola: string;
    blueCrayola50: string;
    orangeSoda: string;
    orangeSoda50: string;
  };

  fontSizes: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

const theme: Theme = {
  typeface: "Space Grotesk, sans-serif",
  colors: {
    bistre: "#33261D",
    grey500: "#665C53",
    grey400: "#999189",
    grey300: "#CCC6BF",
    grey200: "#F3EEE8",
    grey100: "#F9F5EF",
    floralWhite: "#FFFBF5",
    babyPowder: "#FFFDFA",
    blueCrayola: "#3772FF",
    blueCrayola50: "rgba(55, 114, 255, 0.5)",
    orangeSoda: "#FC5130",
    orangeSoda50: "rgba(252, 81, 48, 0.5)",
  },
  fontSizes: {
    sm: "0.8rem",
    md: "1rem",
    lg: "1.563rem",
    xl: "1.953rem",
    xxl: "3.815rem",
  },
};

export default theme;
