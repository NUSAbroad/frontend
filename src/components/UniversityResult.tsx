import React from "react";
import styled from "styled-components";

import FacultiesSection from "./FacultiesSection";
import { Body1, Body2, Divider, Heading2, StyledLink } from "./Styles";
import UniversitySidebar from "./UniversitySidebar";

const HeaderSection = styled.div`
  margin-bottom: 10px;
`;

const InfoSection = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 20px;

  &:not(:last-child) {
    margin-bottom: 50px;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    flex-direction: column;
  }
`;

const UniInfo = styled.div`
  width: calc(100% - 270px);
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    width: 100%;
  }
`;

const StyledHeading2 = styled(Heading2)`
  margin-bottom: 5px;
`;

const StyledBody2 = styled(Body2)`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.grey400};
`;

interface Props {
  university: Types.University;
}

const UniversityResult: React.FC<Props> = (props) => {
  const { university } = props;
  return (
    <>
      <HeaderSection>
        <StyledHeading2>
          <StyledLink to={`/universities/${university.slug}`}>
            {university.name}
          </StyledLink>
        </StyledHeading2>
        <Body1>
          {university.state && `${university.state}, `}
          {university.Country.name}
        </Body1>
      </HeaderSection>
      <Divider />
      <InfoSection>
        <UniInfo>
          <Body1>
            <b>{university.mappingsCount}</b> Previous mappings
          </Body1>
          <FacultiesSection faculties={university.Faculties} />
          {university.foundIn && (
            <StyledBody2>
              Found in: {university.foundIn?.join(", ")}
            </StyledBody2>
          )}
        </UniInfo>
        <UniversitySidebar
          semesters={university.Semesters}
          links={university.Links}
        />
      </InfoSection>
    </>
  );
};

export default UniversityResult;
