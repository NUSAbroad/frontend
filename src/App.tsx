import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useTrackPage } from "./hooks/GoogleAnalytics";
import ComponentsTest from "./pages/ComponentsTest";
import Planner from "./pages/Planner";
import Resources from "./pages/Resources";
import Universities from "./pages/Universities";

ReactGA.initialize("UA-209752856-1");

const App: React.FC = () => {
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
      {/* Testing route, delete later */}
      <Route exact path="/test">
        <ComponentsTest />
      </Route>
    </Router>
  );
};

export default App;
