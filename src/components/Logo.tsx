import React from "react";
import styled from "styled-components";

import { Heading2, StyledLink } from "./Styles";

const Abroad = styled.span`
  font-weight: 300;
`;

const Logo: React.FC = () => {
  return (
    <Heading2>
      <StyledLink to="/">
        NUS<Abroad>Abroad</Abroad>
      </StyledLink>
    </Heading2>
  );
};

export default Logo;
