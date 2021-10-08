import "./App.css";

import React from "react";
import ReactGA from "react-ga";

import { useTrackPage } from "./hooks/GoogleAnalytics";
import logo from "./logo.svg";

ReactGA.initialize("UA-209752856-1");

const App: React.FC = () => {
  useTrackPage();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
