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

interface Props {
  university: Types.University;
}

const UniversityResult: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <StyledColumn $width="75%">
        <Heading2>
          <StyledLink to={`/universities/${props.university.slug}`}>
            {props.university.name}
          </StyledLink>
        </Heading2>
        <PaddedBody1>
          {props.university.state && `${props.university.state}, `}
          {props.university.Country.name}
        </PaddedBody1>
        <PaddedBody1>
          <b>{props.university.mappingsCount}</b> Previous mappings &bull;{" "}
          <b>6</b> Reviews
        </PaddedBody1>
        <FacultiesSection faculties={props.university.Faculties} />
      </StyledColumn>
      <StyledColumn $width="25%">
        <UniversitySidebar
          semesters={props.university.Semesters}
          links={props.university.Links}
        />
      </StyledColumn>
    </Wrapper>
  );
};

export default UniversityResult;
