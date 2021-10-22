import React from "react";
import styled from "styled-components";

import { ReactComponent as CrossIcon } from "../assets/x.svg";

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

interface Props {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  query: string;
  onCrossClickHandler: () => void;
  placeholder: string;
  className?: string;
  fontSize?: string;
}

const SearchBar: React.FC<Props> = (props) => {
  const {
    icon: Icon,
    placeholder,
    onChangeHandler,
    onCrossClickHandler,
    query,
    className,
    fontSize,
  } = props;
  return (
    <SearchBarWrapper className={className}>
      <Icon />
      <SearchBarInput
        $size={fontSize}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={query}
      />
      {query.length !== 0 && <StyledCrossIcon onClick={onCrossClickHandler} />}
    </SearchBarWrapper>
  );
};

export default SearchBar;
