import React from "react";
import styled from "styled-components";

import { Heading2, StyledLink } from "./Styles";

const Abroad = styled.span`
  font-weight: 400;
`;

const Logo = () => {
  return (
    <>
      <Heading2>
        <StyledLink to="/">
          NUS<Abroad>Abroad</Abroad>
        </StyledLink>
      </Heading2>
    </>
  );
};

export default Logo;
