import React from "react";
import styled from "styled-components";

import {
  Column,
  Heading2,
  LinkStyles,
  StyledLink,
  Subheading,
  Wrapper,
} from "../components/Styles";
import { resourcesContent } from "../constants/resources";

const Section = styled.div`
  padding-top: 20px;
`;

const Container = styled.div`
  padding-top: 5px;
`;

const StyledHeading2 = styled(Heading2)`
  display: inline;
  ${LinkStyles}
`;

const Resources: React.FC = () => {
  return (
    <Wrapper>
      <Column $width="100%">
        {resourcesContent.map((section, index) => (
          <Section key={index}>
            <Subheading>{section.header}</Subheading>
            {section.links.map((link, index) => (
              <Container key={index}>
                <StyledLink
                  to={{ pathname: link.url }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StyledHeading2>{link.label}&#8599;</StyledHeading2>
                </StyledLink>
              </Container>
            ))}
          </Section>
        ))}
      </Column>
    </Wrapper>
  );
};

export default Resources;
