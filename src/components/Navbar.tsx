import React, { useState } from "react";
import { useLocation } from "react-router";
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
  const location = useLocation();
  const currentPageLinkId = location.pathname.split("/")[1];
  const [underlinedTextId, setUnderlinedTextId] =
    useState<string>(currentPageLinkId);

  return (
    <Wrapper>
      <Logo>
        <Heading2>
          <StyledLink to="/">NUSAbroad</StyledLink>
        </Heading2>
      </Logo>
      <Links>
        <MarginLink>
          <StyledLink
            to="/planner"
            $isUnderlined={underlinedTextId === "planner"}
            onMouseEnter={() => setUnderlinedTextId("planner")}
            onMouseLeave={() => setUnderlinedTextId(currentPageLinkId)}
          >
            Planner
          </StyledLink>
        </MarginLink>
        <MarginLink>
          <StyledLink
            to="/universities"
            $isUnderlined={underlinedTextId === "universities"}
            onMouseEnter={() => setUnderlinedTextId("universities")}
            onMouseLeave={() => setUnderlinedTextId(currentPageLinkId)}
          >
            Universities
          </StyledLink>
        </MarginLink>
        <MarginLink>
          <StyledLink
            to="/resources"
            $isUnderlined={underlinedTextId === "resources"}
            onMouseEnter={() => setUnderlinedTextId("resources")}
            onMouseLeave={() => setUnderlinedTextId(currentPageLinkId)}
          >
            Resources
          </StyledLink>
        </MarginLink>
      </Links>
    </Wrapper>
  );
};

export default Navbar;
