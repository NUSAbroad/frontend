import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OnboardOverlay from "./components/Onboarding";
import ToastOverlay from "./components/Toast";
import useGoogleAnalytics from "./hooks/GoogleAnalytics";
import About from "./pages/About";
import ComponentsTest from "./pages/ComponentsTest";
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Universities from "./pages/Universities";
import University from "./pages/University";
import { useAppSelector } from "./redux/hooks";
import { getIsVisible } from "./redux/onboardSlice";

const Main = styled.main`
  padding: 0 30px 50px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 0 20px 40px;
  }
`;

// NOTE: Created as a subcomponent as the Google Analytics hook depends on the location
// object which is only available to children of the Router component.
const Routes: React.FC = function () {
  useGoogleAnalytics();

  return (
    <>
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
    </>
  );
};

const App: React.FC = function () {
  const isOnboardVisible = useAppSelector(getIsVisible);

  useEffect(() => {
    if (isOnboardVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
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
        <Routes />
      </Main>
      <Footer />
    </Router>
  );
};

export default App;
