import { useEffect } from "react";

import { APP_TITLE } from "../constants";

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${APP_TITLE}`;
    } else {
      document.title = APP_TITLE;
    }
  }, [title]);
};
