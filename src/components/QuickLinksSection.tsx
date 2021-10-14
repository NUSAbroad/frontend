import React from "react";
import styled from "styled-components";

import { StyledLink, Subheading } from "./Styles";

const Wrapper = styled.div``;

const Title = styled(Subheading)`
  padding-bottom: 10px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuickLinksSection: React.FC = () => {
  return (
    <Wrapper>
      <Title>Quick Links</Title>
      <LinksWrapper>
        <StyledLink to="#">GRO PDF</StyledLink>
        <StyledLink to="#">University Website</StyledLink>
      </LinksWrapper>
    </Wrapper>
  );
};

export default QuickLinksSection;
