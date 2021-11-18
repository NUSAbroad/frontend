import { useEffect } from "react";
import { useLocation } from "react-router";

import analytics from "../utils/analytics";

const useGoogleAnalytics = () => {
  const location = useLocation();

  // Initialise once
  useEffect(() => {
    analytics.init();
  }, []);

  // Update when location changes
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    analytics.sendPageview(currentPath);
  }, [location]);
};

export default useGoogleAnalytics;
