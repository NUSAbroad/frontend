import { useEffect } from "react";
import ReactGA from "react-ga";

export const useTrackPage = (): void => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
};
