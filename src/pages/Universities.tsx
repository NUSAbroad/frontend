import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";
import FilterSearchBar from "../components/FilterSearchBar";
import FilterTag from "../components/FilterTag";
import {
  Body2,
  Column,
  Divider,
  Heading3,
  Subheading,
  Wrapper,
} from "../components/Styles";
import UniversityResult from "../components/UniversityResult";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  width: 100%;
  border-radius: 3px;
  background-color: white;
`;

const SearchBarInput = styled.input.attrs({ type: "text" })`
  padding: 0 10px;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};
  border: none;
  outline: none;
  width: 100%;
`;

const SearchResultCounter = styled(Body2)`
  padding-top: 10px;
  text-align: right;
`;

const StyledHeading3 = styled(Heading3)`
  margin-bottom 5px;
`;

const StyledSubheading = styled(Subheading)`
  padding-top: 20px;
  margin-bottom 5px;
`;

const TagsWrapper = styled.div`
  padding-top: 10px;
`;

const FilterError = styled(Body2)`
  color: ${(props) => props.theme.colors.orangeSoda};
`;

const Universities: React.FC = () => {
  const [filters, setFilters] = useState<Types.Country[]>([]);
  const [filterErrorMsg, setFilterErrorMsg] = useState<string>("");

  const deleteFilter = (filter: Types.Country) => {
    const newFilters = [...filters];
    newFilters.splice(newFilters.indexOf(filter), 1);
    setFilters(newFilters);
  };

  return (
    <Wrapper>
      <Column $width="75%">
        <SearchBarWrapper>
          <SearchIcon />
          <SearchBarInput />
          <CrossIcon />
        </SearchBarWrapper>
        <SearchResultCounter>10 universities found</SearchResultCounter>
        <Divider />
        <UniversityResult />
        <UniversityResult />
        <UniversityResult />
      </Column>
      <Column $width="25%">
        <StyledHeading3>Filter by</StyledHeading3>
        <Divider />
        <StyledSubheading>Country</StyledSubheading>
        <FilterSearchBar
          filters={filters}
          setFilters={setFilters}
          setErrorMsg={setFilterErrorMsg}
        />
        <FilterError>{filterErrorMsg}</FilterError>
        <TagsWrapper>
          {filters.map((tag) => {
            return (
              <FilterTag key={tag.id} tag={tag} deleteFilter={deleteFilter} />
            );
          })}
        </TagsWrapper>
      </Column>
    </Wrapper>
  );
};

export default Universities;
