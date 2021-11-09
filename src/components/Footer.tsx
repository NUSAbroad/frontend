import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Logo } from "../assets/logo-horizontal.svg";
import { FEEDBACK_FORM_URL } from "../constants";
import { Body1, Body2, StyledLink } from "./Styles";

const Container = styled.footer`
  width: 100%;
  margin-top: auto;
  padding: 0 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 0 20px;
  }
`;

const Content = styled.div`
  padding: 3rem 0;
  border-top: 1px solid ${(props) => props.theme.colors.grey200};

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    padding: 2rem 0;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template: "logo column column" / 1fr 10rem 10rem;
  gap: 2rem;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    grid-template:
      "logo logo"
      "column column"
      / 1fr 1fr;
    gap: 2rem 1rem;
  }
`;

const LogoColumn = styled.div`
  grid-area: logo;
  flex-grow: 1;
`;

const StyledLogo = styled(Logo)`
  height: 1.5rem;
  width: auto;
`;

const Copy = styled(Body2)`
  margin: 0.5rem 0 1rem;
  color: ${(props) => props.theme.colors.grey400};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Heading = styled(Body1)`
  color: ${(props) => props.theme.colors.grey300};
  margin-bottom: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: ${(props) => props.theme.colors.bistre};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.blueCrayola};
    text-decoration: underline;
  }
`;

const Footer: React.FC = function () {
  const date = new Date();

  return (
    <Container>
      <Content>
        <Row>
          <LogoColumn>
            <StyledLogo />
            <Copy>&copy; {date.getFullYear()} NUSAbroad</Copy>
            <Body1>
              Have feedback?{" "}
              <StyledLink
                to={{ pathname: FEEDBACK_FORM_URL }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let us know!
              </StyledLink>
            </Body1>
          </LogoColumn>

          <Column>
            <Heading>Menu</Heading>
            <Body1>
              <FooterLink to="/planner">Planner</FooterLink>
            </Body1>
            <Body1>
              <FooterLink to="/universities">Universities</FooterLink>
            </Body1>
            <Body1>
              <FooterLink to="/resources">Resources</FooterLink>
            </Body1>
            <Body1>
              <FooterLink to="/about">About</FooterLink>
            </Body1>
          </Column>
          <Column>
            <Heading>On the web</Heading>
            <Body1>
              <FooterLink
                to={{
                  pathname: "https://www.instagram.com/nusabroad/",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </FooterLink>
            </Body1>
            <Body1>
              <FooterLink
                to={{
                  pathname: "https://www.facebook.com/nusabroad",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </FooterLink>
            </Body1>
            <Body1>
              <FooterLink
                to={{
                  pathname: "https://github.com/NUSAbroad",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </FooterLink>
            </Body1>
          </Column>
        </Row>
      </Content>
    </Container>
  );
};

export default Footer;
