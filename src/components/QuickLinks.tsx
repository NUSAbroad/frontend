import React from "react";
import styled from "styled-components";

import { StyledLink, Subheading } from "./Styles";

interface Props {
  links: { [name: string]: string };
}

const MarginSubheading = styled(Subheading)`
  margin-bottom: 10px;
  margin-top: 1rem;
`;

const QuickLinks: React.FC<Props> = (props) => {
  const { links } = props;
  console.log(Object.keys(links));

  return (
    <>
      <MarginSubheading>Quick Links</MarginSubheading>
      {Object.keys(links).map((key) => {
        return (
          <StyledLink key={key} to={links[key]}>
            {key}
          </StyledLink>
        );
      })}
    </>
  );
};

export default QuickLinks;
