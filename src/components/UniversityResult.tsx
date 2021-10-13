import React from "react";
import styled from "styled-components";

import FacultiesSection from "./FacultiesSection";
import QuickLinksSection from "./QuickLinksSection";
import SemestersSection from "./SemestersSection";
import { Body1, Column, Heading2 } from "./Styles";

const Wrapper = styled.div`
  display: flex;
  padding: 20px 0;
`;

const UniversityName = styled(Heading2)`
  padding-bottom: 10px;
  color: ${(props) => props.theme.colors.blueCrayola};
`;

const PaddedBody1 = styled(Body1)`
  padding-bottom: 20px;
`;

const UniversityResult: React.FC = () => {
  return (
    <Wrapper>
      <Column $width="75%">
        <UniversityName>King&apos;s College London</UniversityName>
        <PaddedBody1>London, United Kingdom</PaddedBody1>
        <PaddedBody1>
          <b>24</b> Previous mappings &bull; <b>6</b> Reviews
        </PaddedBody1>
        <FacultiesSection />
      </Column>
      <Column $width="25%">
        <SemestersSection />
        <QuickLinksSection />
      </Column>
    </Wrapper>
  );
};

export default UniversityResult;
