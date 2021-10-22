import axios, { CancelToken } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import FilterSearchBar from "../components/FilterSearchBar";
import FilterTag from "../components/FilterTag";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import {
  Body2,
  Column,
  Divider,
  Heading3,
  Subheading,
  Wrapper,
} from "../components/Styles";
import UniversityResult from "../components/UniversityResult";
import { BACKEND_URL } from "../constants";

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
  display: flex;
  gap: 10px;
  padding-top: 7px;
  flex-wrap: wrap;
`;

const Universities: React.FC = () => {
  const [filters, setFilters] = useState<Types.Country[]>([]);
  const [results, setResults] = useState<Types.University[]>([]);
  const [filteredResults, setFilteredResults] = useState<Types.University[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => fetchHits(query, token), 500);
    return () => (cancel("No longer last query"), clearTimeout(timeoutId));
  }, [query]);

  useEffect(() => {
    console.log(results);
    filterResults();
  }, [results, filters]);

  const deleteFilter = (filter: Types.Country) => {
    const newFilters = [...filters];
    newFilters.splice(newFilters.indexOf(filter), 1);
    setFilters(newFilters);
  };

  const fetchHits = (query: string, token: CancelToken) => {
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/search/general/${query}`, { cancelToken: token })
      .then((response) => {
        setIsLoading(false);
        setResults(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const filterResults = () => {
    if (filters.length === 0) {
      setFilteredResults(results);
      return;
    }
    const newFilteredResults = [...results].filter((result) => {
      return (
        filters.findIndex((country) => country.id === result.countryId) !== -1
      );
    });
    setFilteredResults(newFilteredResults);
  };

  return (
    <Wrapper>
      <Column $width="75%">
        <SearchBar
          icon={SearchIcon}
          placeholder="University name, module code or name..."
          onChangeHandler={onChangeHandler}
          query={query}
          onCrossClickHandler={() => setQuery("")}
        />
        <SearchResultCounter>
          &nbsp;
          {!filteredResults || isLoading
            ? ""
            : `${filteredResults.length} universities found`}
        </SearchResultCounter>
        <Divider />
        {isLoading || !filteredResults ? (
          <Spinner />
        ) : (
          filteredResults.map((university, index) => (
            <UniversityResult key={index} university={university} />
          ))
        )}
      </Column>
      <Column $width="25%">
        <StyledHeading3>Filter by</StyledHeading3>
        <Divider />
        <StyledSubheading>Country</StyledSubheading>
        <FilterSearchBar filters={filters} setFilters={setFilters} />
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
