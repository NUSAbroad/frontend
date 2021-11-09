import React from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Search } from "../assets/search.svg";
import { FEEDBACK_FORM_URL, RESULTS_PER_PAGE } from "../constants";
import { Body1, Button, Heading3, StyledLink } from "./Styles";
import UniversityResult from "./UniversityResult";

const Wrapper = styled.div<{ $isLoading: boolean }>`
  ${(props) =>
    props.$isLoading &&
    `
    opacity: 50%;
    pointer-events: none;
  `}
`;

const EmptyState = styled.div`
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
`;

const StyledSearch = styled(Search)`
  height: 3rem;
  width: auto;
  margin-bottom: 0.5rem;

  path {
    stroke: ${(props) => props.theme.colors.orangeSoda};
  }
`;

const LoadMore = styled(Button)`
  width: 100%;
  margin-top: 50px;
`;

interface Props {
  results: Types.University[];
  isLoading: boolean;
  query: string;
  loadQuantity: number;
  setLoadQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const UniversityResults: React.FC<Props> = function (props) {
  const { results, isLoading, query, loadQuantity, setLoadQuantity } = props;
  const theme = useTheme();

  return (
    <>
      <Wrapper $isLoading={isLoading}>
        {results.slice(0, loadQuantity).map((university, index) => (
          <UniversityResult
            key={index}
            university={university}
            searchTerm={query}
          />
        ))}
        {!isLoading && results.length === 0 && (
          <EmptyState>
            <StyledSearch />
            <Heading3 $color={theme.colors.grey500}>
              No results for &ldquo;{query}&rdquo;
            </Heading3>
            <Body1
              $color={theme.colors.grey400}
              style={{ marginTop: "0.4rem" }}
            >
              Can&apos;t find your uni here? Drop a suggestion{" "}
              <StyledLink
                to={{ pathname: FEEDBACK_FORM_URL }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </StyledLink>{" "}
              to let us know what we&apos;re missing!
            </Body1>
          </EmptyState>
        )}
      </Wrapper>
      {loadQuantity < results.length && (
        <LoadMore
          onClick={() => setLoadQuantity(loadQuantity + RESULTS_PER_PAGE)}
        >
          Load More
        </LoadMore>
      )}
    </>
  );
};

export default UniversityResults;
