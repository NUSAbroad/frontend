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

const StyledBody2 = styled(Body2)`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.grey400};
`;

const SearchTerm = styled.span`
  font-weight: 900;
`;

const TitleSpan = styled.span<{ $underlined?: boolean; $weight?: number }>`
  text-decoration: ${(props) => (props.$underlined ? "underline" : "none")};
  font-weight: ${(props) =>
    props.$underlined && props.$weight ? props.$weight : "inherit"};
`;

interface Props {
  university: Types.University;
  searchTerm: string;
}

interface Tokens {
  token: string;
  firstMatch: boolean;
}

const UniversityResult: React.FC<Props> = (props) => {
  const { university, searchTerm } = props;

  const tokenizeNames = (name: string) => {
    const toMatch = searchTerm.toUpperCase();
    const tokens: Tokens[] = name.split(" ").map((term) => {
      return {
        token: term,
        firstMatch: false,
      };
    });
    const matchIndex = tokens.findIndex((token) => {
      return token.token.toUpperCase().indexOf(toMatch) !== -1;
    });
    if (matchIndex !== -1 && toMatch !== "") {
      tokens[matchIndex].firstMatch = true;
    }

    return tokens;
  };

  const foundInMappings = () => {
    return (
      university.foundIn?.findIndex((term) => term === "Module Mappings") !== -1
    );
  };

  return (
    <>
      <HeaderSection>
        {foundInMappings() && searchTerm !== "" && (
          <Body2>
            Found mappings related to &quot;
            <SearchTerm>{searchTerm}</SearchTerm>
            &quot;
          </Body2>
        )}
        <StyledHeading2>
          <StyledLink to={`/universities/${university.slug}`}>
            {tokenizeNames(university.name).map((token) => {
              return (
                <TitleSpan
                  key={token.token}
                  $underlined={token.firstMatch}
                  $weight={700}
                >
                  {token.token}&nbsp;
                </TitleSpan>
              );
            })}
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
