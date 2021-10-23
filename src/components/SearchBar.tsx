import React from "react";
import styled, { css } from "styled-components";

import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as SmallSearchIcon } from "../assets/search-small.svg";
import { ReactComponent as CrossIcon } from "../assets/x.svg";
import { ReactComponent as SmallCrossIcon } from "../assets/x-small.svg";

const IconStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSearchIcon = styled(SearchIcon)`
  ${IconStyles}
  left: 10px;
`;

const StyledSmallSearchIcon = styled(SmallSearchIcon)`
  ${IconStyles}
  left: 8px;
`;

const StyledCrossIcon = styled(CrossIcon)`
  ${IconStyles}
  right: 10px;
  cursor: pointer;
`;

const StyledSmallCrossIcon = styled(SmallCrossIcon)`
  ${IconStyles}
  right: 8px;
  cursor: pointer;
`;

const SearchBarWrapper = styled.div`
  position: relative;

  &:focus-within {
    ${StyledSearchIcon}, ${StyledSmallSearchIcon} {
      path {
        stroke: ${(props) => props.theme.colors.blueCrayola};
      }
    }
  }
`;

interface TextProps {
  $isSmall?: boolean;
}

const SearchBarInput = styled.input.attrs({ type: "text" })<TextProps>`
  width: 100%;
  padding: ${(props) => (props.$isSmall ? "8px 34px" : "10px 44px")};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.babyPowder};
  color: ${(props) => props.theme.colors.bistre};
  font-weight: 400;
  font-size: ${(props) =>
    props.$isSmall ? props.theme.fontSizes.sm : props.theme.fontSizes.md};

  &::placeholder {
    color: ${(props) => props.theme.colors.grey400};
  }

  &:focus {
    outline: 0;
    border-color: ${(props) => props.theme.colors.blueCrayola};
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.blueCrayola50};
  }
`;

interface Props {
  className?: string;
  size?: string;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  query: string;
  onCrossClickHandler: () => void;
  placeholder: string;
}

const SearchBar: React.FC<Props> = (props) => {
  const {
    className,
    size,
    placeholder,
    onChangeHandler,
    onCrossClickHandler,
    query,
  } = props;

  return (
    <SearchBarWrapper className={className}>
      {size == "sm" ? <StyledSmallSearchIcon /> : <StyledSearchIcon />}
      <SearchBarInput
        $isSmall={size == "sm"}
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
