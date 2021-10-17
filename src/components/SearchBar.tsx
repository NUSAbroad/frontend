import React from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";

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

const StyledCrossIcon = styled(CrossIcon)`
  cursor: pointer;
`;

interface Props {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  query: string;
  onCrossClickHandler: () => void;
}

const SearchBar: React.FC<Props> = ({
  onChangeHandler,
  query,
  onCrossClickHandler,
}) => {
  return (
    <SearchBarWrapper>
      <SearchIcon />
      <SearchBarInput onChange={onChangeHandler} value={query} />
      {query.length !== 0 ? (
        <StyledCrossIcon onClick={onCrossClickHandler} />
      ) : null}
    </SearchBarWrapper>
  );
};

export default SearchBar;
