import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useTheme } from "styled-components";

import Navbar from "./components/Navbar";
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
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Universities from "./pages/Universities";

ReactGA.initialize("UA-209752856-1");

const App: React.FC = () => {
  const theme = useTheme();
  useTrackPage();

  return (
    <Router>
      <Navbar />
      <Route exact path="/">
        <Redirect to="/planner" />
      </Route>
      <Route exact path="/planner">
        <Planner />
      </Route>
      <Route exact path="/universities">
        <Universities />
      </Route>
      <Route exact path="/resources">
        <Resources />
      </Route>
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
    </Router>
  );
};

export default App;
