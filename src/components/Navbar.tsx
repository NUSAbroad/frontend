import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

import { Body1, Heading2, StyledLink } from "./Styles";

const Wrapper = styled.div<{ $boxShadow: boolean }>`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  padding: 1rem;
  box-shadow: ${(props) => (props.$boxShadow ? "0 4px 2px -2px gray" : "none")};
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
  const [boxShadow, setBoxShadow] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop === 0) {
      setBoxShadow(false);
    } else {
      setBoxShadow(true);
    }
  };

  return (
    <Wrapper $boxShadow={boxShadow}>
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
