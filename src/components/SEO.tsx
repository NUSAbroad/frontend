import React from "react";
import { Helmet } from "react-helmet";

import { APP_TITLE } from "../constants";

interface Props {
  title?: string;
}

const SEO: React.FC<Props> = function (props) {
  const { title } = props;

  if (title == null) {
    return null;
  }

  return (
    <Helmet titleTemplate="%s | NUSAbroad" defaultTitle={APP_TITLE}>
      <title>{title}</title>
      <meta property="og:title" content={`${title} | ${APP_TITLE}`} />
      <meta name="twitter:title" content={`${title} | ${APP_TITLE}`} />
    </Helmet>
  );
};

export default SEO;
