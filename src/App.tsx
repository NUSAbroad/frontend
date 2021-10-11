import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router } from "react-router-dom";
import { useTheme } from "styled-components";

import Notice from "./components/Notice";
import {
  Body1,
  Body2,
  Button,
  Divider,
  Heading1,
  Heading2,
  Heading3,
  StyledLink,
  Subheading,
} from "./components/Styles";
import { useTrackPage } from "./hooks/GoogleAnalytics";

ReactGA.initialize("UA-209752856-1");

const App: React.FC = () => {
  const theme = useTheme();
  useTrackPage();

  return (
    <Router>
      <Heading1>Heading1</Heading1>
      <Divider />
      <Heading2>Heading2</Heading2>
      <Heading3>Heading3</Heading3>
      <Subheading>Subheading</Subheading>
      <Body1>Body1</Body1>
      <Body2>Body2</Body2>
      <Heading2>
        <StyledLink to="/">Link</StyledLink>
      </Heading2>
      <Body1>
        <StyledLink to="/">Link</StyledLink>
      </Body1>
      <Button>Button</Button>
      <Button
        $color={theme.colors.orangeSoda}
        $focusColor={theme.colors.orangeSoda50}
      >
        Button
      </Button>
      <Notice>This is a notice</Notice>
    </Router>
  );
};

export default App;
