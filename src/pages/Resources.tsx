import React from "react";
import styled from "styled-components";

import {
  Column,
  Heading1,
  Heading2,
  LinkStyles,
  Subheading,
  Wrapper,
} from "../components/Styles";

const Section = styled.div`
  padding-top: 20px;
`;

const Container = styled.div`
  padding-top: 5px;
`;

const StyledLink = styled(Heading2)`
  display: inline;
  cursor: pointer;
  ${LinkStyles}
`;

const Resources: React.FC = () => {
  return (
    <Wrapper>
      <Column $width="100%">
        <Heading1>Useful Resources</Heading1>
        <Section>
          <Subheading>General</Subheading>
          <Container>
            <StyledLink>GRO Website &#8599;</StyledLink>
          </Container>
          <Container>
            <StyledLink>GRO Essential Guide PDF &#8599;</StyledLink>
          </Container>
        </Section>
        <Section>
          <Subheading>Faculty-Specific SEP Websites</Subheading>
          <Container>
            <StyledLink>School of Computing &#8599;</StyledLink>
          </Container>
          <Container>
            <StyledLink>Faculty of Arts and Social Sciences &#8599;</StyledLink>
          </Container>
          <Container>
            <StyledLink>Faculty of Science &#8599;</StyledLink>
          </Container>
          <Container>
            <StyledLink>Buisness School &#8599;</StyledLink>
          </Container>
          <Container>
            <StyledLink>School of Design and Environment &#8599;</StyledLink>
          </Container>
        </Section>
        <Section>
          <Subheading>Community Resources</Subheading>
          <Container>
            <StyledLink>ExchangeBuddy &#8599;</StyledLink>
          </Container>
        </Section>
      </Column>
    </Wrapper>
  );
};

export default Resources;
