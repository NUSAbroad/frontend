import React from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
`;

const SearchBarInput = styled.input.attrs({ type: "text" })`
  padding: 0 10px;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};
  background-color: ${(props) => props.theme.colors.babyPowder};
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
  placeholder: string;
  className?: string;
}

const SearchBar: React.FC<Props> = (props) => {
  const {
    placeholder,
    onChangeHandler,
    onCrossClickHandler,
    query,
    className,
  } = props;
  return (
    <SearchBarWrapper className={className}>
      <SearchIcon />
      <SearchBarInput
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={query}
      />
      {query.length !== 0 && <StyledCrossIcon onClick={onCrossClickHandler} />}
    </SearchBarWrapper>
  );
};

export default SearchBar;
