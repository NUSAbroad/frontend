import React from "react";
import { Helmet } from "react-helmet";

import { APP_TITLE } from "../constants";

interface Props {
  title?: string;
}

const SEO: React.FC<Props> = function (props) {
  const { title, children } = props;

  return (
    <Helmet titleTemplate={`%s | ${APP_TITLE}`} defaultTitle={APP_TITLE}>
      {children}
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={`${title} | ${APP_TITLE}`} />
          <meta name="twitter:title" content={`${title} | ${APP_TITLE}`} />
        </>
      )}
    </Helmet>
  );
};

export default SEO;
