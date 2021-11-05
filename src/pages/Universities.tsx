import axios, { CancelToken } from "axios";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Cross } from "../assets/x.svg";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import SEO from "../components/SEO";
import Spinner from "../components/Spinner";
import {
  Body2,
  Button,
  Divider,
  Heading3,
  Subheading,
} from "../components/Styles";
import UniversityResult from "../components/UniversityResult";
import { BACKEND_URL } from "../constants";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 30px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 0;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    display: block;
  }
`;

const UnisSection = styled.div``;

const FilterSection = styled.div`
  width: 300px;
  position: sticky;
  height: fit-content;
  top: 80px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    display: none;
  }
`;

const SearchHelpers = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 5px;

  @media (min-width: ${(props) => props.theme.breakPoints.md}) {
    justify-content: flex-end;
  }
`;

const FilterButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: ${(props) => props.theme.colors.blueCrayola};
  font-size: ${(props) => props.theme.fontSizes.sm};
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.breakPoints.md}) {
    display: none;
  }
`;

const SearchResultCounter = styled(Body2)`
  text-align: right;
  font-weight: 500;
`;

const Results = styled.div<{ $isLoading: boolean }>`
  ${(props) =>
    props.$isLoading &&
    `
    opacity: 50%;
    pointer-events: none;
  `}
`;

const StyledHeading3 = styled(Heading3)`
  margin-bottom 5px;
`;

const StyledSubheading = styled(Subheading)`
  margin: 20px 0 10px;
`;

const FilterOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4;

  @media (min-width: ${(props) => props.theme.breakPoints.md}) {
    display: none;
  }
`;

const FilterDrawer = styled.div`
  position: absolute;
  bottom: 0;
  height: 70%;
  width: 100%;
  background: ${(props) => props.theme.colors.floralWhite};
  padding: 20px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  box-shadow: 0px -5px 30px 0px rgba(0, 0, 0, 0.5);
`;

const FilterDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
`;

const LoadMore = styled(Button)`
  width: 100%;
  margin-top: 50px;
`;

const StickyWrapper = styled.div<{ $padding: number }>`
  position: sticky;
  top: 50px;
  padding-top: ${(props) => `${props.$padding}px`};
  background: ${(props) => props.theme.colors.floralWhite};
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    top: 80px;
  }
`;

const Universities: React.FC = () => {
  const threshold = 20;
  const theme = useTheme();
  const [filters, setFilters] = useState<Types.Country[]>([]);
  const [results, setResults] = useState<Types.University[]>([]);
  const [filteredResults, setFilteredResults] = useState<Types.University[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [loadQuantity, setLoadQuantity] = useState<number>(threshold);
  const [stickyPadding, setStickyPadding] = useState<number>(0);

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => fetchHits(query, token), 500);
    return () => (cancel("No longer last query"), clearTimeout(timeoutId));
  }, [query]);

  useEffect(() => {
    filterResults();
    setLoadQuantity(threshold);
  }, [results, filters]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop <= 0) {
      setStickyPadding(0);
    } else {
      setStickyPadding(30);
    }
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
      <SEO title="Universities" />
      <UnisSection>
        <StickyWrapper $padding={stickyPadding}>
          <SearchBar
            placeholder="University name, module code or name..."
            onChangeHandler={onChangeHandler}
            query={query}
            onCrossClickHandler={() => setQuery("")}
            isLoading={isLoading}
          />
          <SearchHelpers>
            <FilterButton onClick={() => setIsFilterVisible(true)}>
              Filter
            </FilterButton>
            <SearchResultCounter $color={theme.colors.grey400}>
              &nbsp;
              {!filteredResults || isLoading
                ? ""
                : `${filteredResults.length} universities found`}
            </SearchResultCounter>
          </SearchHelpers>
          <Divider style={{ marginBottom: "30px" }} />
        </StickyWrapper>
        {!filteredResults ? (
          <Spinner />
        ) : (
          <>
            <Results $isLoading={isLoading}>
              {filteredResults
                .slice(0, loadQuantity)
                .map((university, index) => (
                  <UniversityResult
                    key={index}
                    university={university}
                    searchTerm={query}
                  />
                ))}
            </Results>
            {loadQuantity < filteredResults.length && (
              <LoadMore
                onClick={() => setLoadQuantity(loadQuantity + threshold)}
              >
                Load More
              </LoadMore>
            )}
          </>
        )}
      </UnisSection>
      <FilterSection>
        <StyledHeading3 $color={theme.colors.grey400}>Filter by</StyledHeading3>
        <Divider />
        <StyledSubheading>Country</StyledSubheading>
        <Filter filters={filters} setFilters={setFilters} />
      </FilterSection>
      {isFilterVisible && (
        <FilterOverlay>
          <FilterDrawer>
            <FilterDrawerHeader>
              <StyledHeading3 $color={theme.colors.grey400}>
                Filter by
              </StyledHeading3>
              <CloseButton onClick={() => setIsFilterVisible(false)}>
                <Cross />
              </CloseButton>
            </FilterDrawerHeader>
            <Divider />
            <StyledSubheading>Country</StyledSubheading>
            <Filter filters={filters} setFilters={setFilters} />
          </FilterDrawer>
        </FilterOverlay>
      )}
    </Wrapper>
  );
};

export default Universities;
