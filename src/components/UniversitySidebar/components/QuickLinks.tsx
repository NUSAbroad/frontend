import React from "react";
import styled from "styled-components";

import { StyledLink, Subheading } from "../../Styles";

const MarginSubheading = styled(Subheading)`
  margin-bottom: 10px;
  margin-top: 20px;
`;

interface Props {
  links: Types.Link[];
}
const QuickLinks: React.FC<Props> = (props) => {
  const { links } = props;

  return (
    <>
      <MarginSubheading>Quick Links</MarginSubheading>
      {links.map((link, index) => {
        return (
          <StyledLink
            key={index}
            to={{ pathname: `${link.link}` }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </StyledLink>
        );
      })}
    </>
  );
};

export default QuickLinks;
