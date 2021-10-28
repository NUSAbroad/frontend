import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: ${(props) => props.theme.typeface};
    font-size: 18px;

    @media (max-width: ${(props) => props.theme.breakPoints.md}) {
      font-size: 16px;
    }

    @media (max-width: ${(props) => props.theme.breakPoints.sm}) {
      font-size: 14px;
    }
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
    overflow-y: auto;

    #root {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100%;
    }
  }

  input,
  textarea {
    font-family: ${(props) => props.theme.typeface};
    appearance: none;
  }
`;

export default GlobalStyle;
