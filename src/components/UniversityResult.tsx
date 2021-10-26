import React from "react";
import styled from "styled-components";

import FacultiesSection from "./FacultiesSection";
import { Body1, Heading2, StyledLink } from "./Styles";
import UniversitySidebar from "./UniversitySidebar";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
`;

const UniInfo = styled.div`
  width: calc(100% - 220px);
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: calc(100% - 220px);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const StyledHeading2 = styled(Heading2)`
  margin-bottom: 5px;
`;

interface Props {
  university: Types.University;
}

const UniversityResult: React.FC<Props> = (props) => {
  const { university } = props;
  return (
    <Wrapper>
      <UniInfo>
        <StyledHeading2>
          <StyledLink to={`/universities/${university.slug}`}>
            {university.name}
          </StyledLink>
        </StyledHeading2>
        <Body1 style={{ marginTop: "5px" }}>
          {university.state && `${university.state}, `}
          {university.Country.name}
        </Body1>
        <Body1 style={{ marginTop: "15px" }}>
          <b>{university.mappingsCount}</b> Previous mappings &bull; <b>6</b>{" "}
          Reviews
        </Body1>
        <FacultiesSection faculties={university.Faculties} />
      </UniInfo>
      <UniversitySidebar
        semesters={university.Semesters}
        links={university.Links}
      />
    </Wrapper>
  );
};

export default UniversityResult;
