import React, { useEffect } from "react";
import ReactGA from "react-ga";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OnboardOverlay from "./components/Onboarding";
import ToastOverlay from "./components/Toast";
import { useTrackPage } from "./hooks/GoogleAnalytics";
import About from "./pages/About";
import ComponentsTest from "./pages/ComponentsTest";
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Universities from "./pages/Universities";
import University from "./pages/University";
import { useAppSelector } from "./redux/hooks";
import { getIsVisible } from "./redux/onboardSlice";

ReactGA.initialize("UA-209752856-1");

const Main = styled.main`
  padding: 0 30px 50px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 0 20px 40px;
  }
`;

const App: React.FC = () => {
  const isOnboardVisible = useAppSelector(getIsVisible);

  useTrackPage();

  useEffect(() => {
    if (isOnboardVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [isOnboardVisible]);

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
        <Route exact path="/about">
          <About />
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
