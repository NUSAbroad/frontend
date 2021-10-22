import React from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as SmallSearchIcon } from "../assets/search-small.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";
import { ReactComponent as SmallCrossIcon } from "../assets/x-small.svg";
import theme from "../styles/theme";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
`;

interface TextProps {
  $size?: string;
}

const SearchBarInput = styled.input.attrs({ type: "text" })<TextProps>`
  padding: 0 10px;
  font-weight: 400;
  font-size: ${(props) => props.$size ?? props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};
  background-color: ${(props) => props.theme.colors.babyPowder};
  border: none;
  outline: none;
  width: 100%;
`;

const StyledCrossIcon = styled(CrossIcon)`
  cursor: pointer;
`;

const StyledSmallCrossIcon = styled(SmallCrossIcon)`
  cursor: pointer;
`;

interface Props {
  size?: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  query: string;
  onCrossClickHandler: () => void;
  placeholder: string;
  className?: string;
}

const SearchBar: React.FC<Props> = (props) => {
  const {
    size,
    placeholder,
    onChangeHandler,
    onCrossClickHandler,
    query,
    className,
  } = props;
  return (
    <SearchBarWrapper className={className}>
      {size == "sm" ? <SmallSearchIcon /> : <SearchIcon />}
      <SearchBarInput
        $size={size == "sm" ? theme.fontSizes.sm : undefined}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={query}
      />
      {query.length !== 0 &&
        (size == "sm" ? (
          <StyledSmallCrossIcon onClick={onCrossClickHandler} />
        ) : (
          <StyledCrossIcon onClick={onCrossClickHandler} />
        ))}
    </SearchBarWrapper>
  );
};

export default SearchBar;
