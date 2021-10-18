import axios, { CancelToken } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as ChevronIcon } from "../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as CrossInCircleIcon } from "../assets/x-circle.svg";
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

const TagWrapper = styled.div`
  padding: 0 15px;
  display: inline-block;
  line-height: 25px;
  border: 1px solid ${(props) => props.theme.colors.blueCrayola};
  border-radius: 35px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TagsWrapper = styled.div`
  padding-top: 10px;
`;

const TagBody2 = styled(Body2)`
  color: ${(props) => props.theme.colors.blueCrayola};
  margin-right: 10px;
`;

const Universities: React.FC = () => {
  const [results, setResults] = useState<Types.University[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const { cancel, token } = axios.CancelToken.source();
    const timeoutId = setTimeout(() => fetchHits(query, token), 500);
    return () => (cancel("No longer last query"), clearTimeout(timeoutId));
  }, [query]);

  const fetchHits = (query: string, token: CancelToken) => {
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/search/general/${query}`, { cancelToken: token })
      .then((response) => {
        setIsLoading(false);
        setResults(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  return (
    <Wrapper>
      <Column $width="75%">
        <SearchBar
          placeholder="University name, module code or name..."
          onChangeHandler={onChangeHandler}
          query={query}
          onCrossClickHandler={() => setQuery("")}
        />
        <SearchResultCounter>
          &nbsp;
          {!results || isLoading ? "" : `${results.length} universities found`}
        </SearchResultCounter>
        <Divider />
        {isLoading || !results ? (
          <Spinner />
        ) : (
          results.map((university, index) => (
            <UniversityResult key={index} university={university} />
          ))
        )}
      </Column>
      <Column $width="25%">
        <StyledHeading3>Filter by</StyledHeading3>
        <Divider />
        <StyledSubheading>Country</StyledSubheading>
        <SearchBarWrapper>
          <SearchIcon />
          <SearchBarInput />
          <ChevronIcon />
        </SearchBarWrapper>
        <TagsWrapper>
          <TagWrapper>
            <TagContainer>
              <TagBody2>United Kingdom</TagBody2>
              <CrossInCircleIcon style={{ transform: "scale(1.2)" }} />
            </TagContainer>
          </TagWrapper>
          <TagWrapper>
            <TagContainer>
              <TagBody2>Canada</TagBody2>
              <CrossInCircleIcon style={{ transform: "scale(1.2)" }} />
            </TagContainer>
          </TagWrapper>
        </TagsWrapper>
      </Column>
    </Wrapper>
  );
};

export default Universities;
