import axios, { CancelToken } from "axios";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import { Body2, Divider, Heading3, Subheading } from "../components/Styles";
import UniversityResult from "../components/UniversityResult";
import { BACKEND_URL } from "../constants";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 30px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 0;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const UnisSection = styled.div``;

const FilterSection = styled.div`
  width: 300px;
`;

const SearchResultCounter = styled(Body2)`
  padding-top: 10px;
  text-align: right;
`;

const StyledHeading3 = styled(Heading3)`
  margin-bottom 5px;
`;

const StyledSubheading = styled(Subheading)`
  margin: 20px 0 10px;
`;

const Universities: React.FC = () => {
  const theme = useTheme();
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
    filterResults();
  }, [results, filters]);

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
      <UnisSection>
        <SearchBar
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
      </UnisSection>
      <FilterSection>
        <StyledHeading3 $color={theme.colors.grey400}>Filter by</StyledHeading3>
        <Divider />
        <StyledSubheading>Country</StyledSubheading>
        <Filter filters={filters} setFilters={setFilters} />
      </FilterSection>
    </Wrapper>
  );
};

export default Universities;
