import React from "react";
import styled from "styled-components";

import { ReactComponent as Arrow } from "../assets/arrow.svg";
import {
  Heading1,
  Heading2,
  StyledLink,
  Subheading,
} from "../components/Styles";
import { resourcesContent } from "../constants/resources";

const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Section = styled.div`
  margin-top: 30px;
`;

const StyledHeading2 = styled(Heading2)`
  margin-top: 10px;
`;

const StyledArrow = styled(Arrow)`
  position: absolute;
  bottom: 0.5rem;
  right: 0;
`;

const ArrowLink = styled(StyledLink)`
  position: relative;
  padding-right: 1.5rem;

  &:hover {
    ${StyledArrow} {
      bottom: calc(0.5rem + 5px);
      right: -5px;
    }
  }
`;

const Resources: React.FC = () => {
  return (
    <Wrapper>
      <Heading1>Useful Resources</Heading1>
      {resourcesContent.map((section, index) => (
        <Section key={index}>
          <Subheading>{section.header}</Subheading>
          {section.links.map((link, index) => (
            <StyledHeading2 key={index}>
              <ArrowLink
                to={{ pathname: link.url }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <StyledArrow />
              </ArrowLink>
            </StyledHeading2>
          ))}
        </Section>
      ))}
    </Wrapper>
  );
};

export default Resources;
