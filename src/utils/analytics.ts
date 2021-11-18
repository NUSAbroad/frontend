import ReactGA from "react-ga";

const TRACKING_ID = "UA-209752856-1";

const init = () => {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
  ReactGA.initialize(TRACKING_ID, { debug: isDev });
};

const sendEvent = (payload: ReactGA.EventArgs) => {
  ReactGA.event(payload);
};

const sendPageview = (path: string) => {
  ReactGA.pageview(path);
};

export default {
  init,
  sendEvent,
  sendPageview,
};
