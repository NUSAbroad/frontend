import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import Logo from "./Logo";
import { Body1, StyledNavLink } from "./Styles";

const Background = styled.nav`
  position: sticky;
  top: 0;
  padding: 0 30px;
  background: ${(props) => props.theme.colors.floralWhite};
  z-index: 3;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 0 20px;
  }
`;

const Wrapper = styled.div<{ $boxShadow: boolean }>`
  display: flex;
  width: 100%;
  padding: 2px;
  ${(props) =>
    props.$boxShadow &&
    `border-bottom: 1px solid ${props.theme.colors.grey200}`};

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
  }
`;

const LogoWrapper = styled.div`
  flex-grow: 1;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 10px 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Navbar: React.FC = () => {
  const theme = useTheme();
  const [boxShadow, setBoxShadow] = useState<boolean>(false);

  const activeStyle = {
    textDecoration: "underline",
    color: theme.colors.blueCrayola,
  };

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
    <Background>
      <Wrapper $boxShadow={boxShadow}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Links>
          <Body1>
            <StyledNavLink to="/planner" activeStyle={activeStyle}>
              Planner
            </StyledNavLink>
          </Body1>
          <Body1>
            <StyledNavLink to="/universities" activeStyle={activeStyle}>
              Universities
            </StyledNavLink>
          </Body1>
          <Body1>
            <StyledNavLink to="/resources" activeStyle={activeStyle}>
              Resources
            </StyledNavLink>
          </Body1>
        </Links>
      </Wrapper>
    </Background>
  );
};

export default Navbar;
