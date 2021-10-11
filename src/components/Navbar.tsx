import React from "react";
import styled from "styled-components";

import { Body1, Heading2, StyledLink } from "./Styles";

const Wrapper = styled.div`
  position: sticky;
  width: 100%;
  display: flex;
  padding: 1rem;
`;

const Logo = styled.div`
  flex-grow: 1;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
`;

const MarginLink = styled(Body1)`
  margin: 0 1rem;
`;

const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <Logo>
        <Heading2>
          <StyledLink to="/">NUSAbroad</StyledLink>
        </Heading2>
      </Logo>
      <Links>
        <MarginLink>
          <StyledLink to="/planner">Planner</StyledLink>
        </MarginLink>
        <MarginLink>
          <StyledLink to="/universities">Universities</StyledLink>
        </MarginLink>
        <MarginLink>
          <StyledLink to="/resources">Resources</StyledLink>
        </MarginLink>
      </Links>
    </Wrapper>
  );
};

export default Navbar;
