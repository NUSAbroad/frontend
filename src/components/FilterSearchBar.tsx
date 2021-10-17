import React from "react";
import styled from "styled-components";

import { ReactComponent as ChevronIcon } from "../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";

const Wrapper = styled.div`
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

const FilterSearchBar: React.FC = () => {
  return (
    <Wrapper>
      <SearchIcon />
      <SearchBarInput />
      <ChevronIcon />
    </Wrapper>
  );
};

export default FilterSearchBar;
