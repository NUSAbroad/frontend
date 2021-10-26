import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: ${(props) => props.theme.typeface};
    font-size: 18px;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background: ${(props) => props.theme.colors.floralWhite};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    #root {
      height: 100%;
      width: 100%;
      padding: 0 30px;

      @media (max-width: ${(props) => props.theme.breakPoints.md}) {
        padding: 0 20px;
      }
    }
  }

  input,
  textarea {
    font-family: ${(props) => props.theme.typeface};
    appearance: none;
  }
`;

export default GlobalStyle;
