import React from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OnboardOverlay from "./components/Onboarding";
import ToastOverlay from "./components/Toast";
import { useTrackPage } from "./hooks/GoogleAnalytics";
import ComponentsTest from "./pages/ComponentsTest";
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Universities from "./pages/Universities";
import University from "./pages/University";

ReactGA.initialize("UA-209752856-1");

const Main = styled.main`
  padding: 0 30px 50px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 0 20px 40px;
  }
`;

const App: React.FC = () => {
  useTrackPage();

  return (
    <Router>
      <Helmet>
        <title>NUSAbroad</title>
        <meta property="og:title" content="NUSAbroad" />
        <meta name="twitter:title" content="NUSAbroad" />
      </Helmet>
      <Navbar />
      <Main>
        <Route exact path="/">
          <Redirect to="/planner" />
        </Route>
        <Route exact path="/planner">
          <Planner />
        </Route>
        <Route exact path="/universities">
          <Universities />
        </Route>
        <Route path="/universities/:slug">
          <University />
        </Route>
        <Route exact path="/resources">
          <Resources />
        </Route>
        {/* Testing route, delete later */}
        <Route exact path="/test">
          <ComponentsTest />
        </Route>
        <ToastOverlay />
        <OnboardOverlay />
      </Main>
      <Footer />
    </Router>
  );
};

export default App;
