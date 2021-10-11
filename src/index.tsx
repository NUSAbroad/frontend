import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import App from "./App";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./styles/global-styles";
import theme from "./styles/theme";

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
