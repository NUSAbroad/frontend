import React from "react";
import styled, { useTheme } from "styled-components";

import FacultiesSection from "./FacultiesSection";
import { Body1, Body2, Divider, Heading2, StyledLink } from "./Styles";
import UniversitySidebar from "./UniversitySidebar";

const HeaderSection = styled.div`
  margin-bottom: 10px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

const UniInfo = styled.div`
  width: calc(100% - 270px);
  padding: 0;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    width: 100%;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    width: calc(100% - 270px);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const StyledHeading2 = styled(Heading2)`
  margin-bottom: 5px;
  font-weight: 500;
`;

const SearchTerm = styled.span`
  font-weight: 700;
`;

interface Props {
  university: Types.University;
  searchTerm: string;
}

const UniversityResult: React.FC<Props> = (props) => {
  const { university, searchTerm } = props;
  const theme = useTheme();

  const foundInMappings = () => {
    return university.foundIn?.includes("Module Mappings");
  };

  return (
    <>
      <HeaderSection>
        {foundInMappings() && searchTerm !== "" && (
          <Body2 $color={theme.colors.grey400}>
            Found mappings related to &quot;
            <SearchTerm>{searchTerm}</SearchTerm>
            &quot;
          </Body2>
        )}
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
