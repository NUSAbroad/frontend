import React from "react";
import styled from "styled-components";

import FacultiesSection from "./FacultiesSection";
import { Body1, Column, Heading2, StyledLink } from "./Styles";
import UniversitySidebar from "./UniversitySidebar";

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;
`;

const PaddedBody1 = styled(Body1)`
  padding-bottom: 20px;
`;

const StyledColumn = styled(Column)`
  padding: 0;
`;

const UniversityResult: React.FC = () => {
  return (
    <Wrapper>
      <StyledColumn $width="75%">
        <Heading2>
          <StyledLink to="#">King&apos;s College London</StyledLink>
        </Heading2>
        <PaddedBody1>London, United Kingdom</PaddedBody1>
        <PaddedBody1>
          <b>24</b> Previous mappings &bull; <b>6</b> Reviews
        </PaddedBody1>
        <FacultiesSection />
      </StyledColumn>
      <StyledColumn $width="25%">
        <UniversitySidebar
          semesters={["Sept - Dec", "Jan - June"]}
          links={[{ link: "/test", name: "GRO PDF" }]}
        />
      </StyledColumn>
    </Wrapper>
  );
};

export default UniversityResult;
