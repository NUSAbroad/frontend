import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import { Body1, StyledNavLink } from "./Styles";

const Wrapper = styled.div<{ $boxShadow: boolean }>`
  position: sticky;
  top: 0;
  display: flex;
  width: 100%;
  padding: 2px 30px;
  background: ${(props) => props.theme.colors.floralWhite};
  ${(props) =>
    props.$boxShadow &&
    `border-bottom: 1px solid ${props.theme.colors.grey300}`};
  z-index: 99;
`;

const LogoWrapper = styled.div`
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
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Links>
        <MarginLink>
          <StyledNavLink
            to="/planner"
            activeStyle={{ textDecoration: "underline" }}
          >
            Planner
          </StyledNavLink>
        </MarginLink>
        <MarginLink>
          <StyledNavLink
            to="/universities"
            activeStyle={{ textDecoration: "underline" }}
          >
            Universities
          </StyledNavLink>
        </MarginLink>
        <MarginLink>
          <StyledNavLink
            to="/resources"
            activeStyle={{ textDecoration: "underline" }}
          >
            Resources
          </StyledNavLink>
        </MarginLink>
      </Links>
    </Wrapper>
  );
};

export default Navbar;
