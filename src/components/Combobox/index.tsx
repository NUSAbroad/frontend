import React, { ReactElement, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as ChevronIcon } from "../../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../../assets/search-small.svg";
import Listbox from "./components/Listbox";
import { IComboboxProps } from "./types";

const IconStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const StyledSearchIcon = styled(SearchIcon)`
  ${IconStyles}
  left: 8px;
`;
const StyledChevronIcon = styled(ChevronIcon)`
  ${IconStyles}
  right: 8px;
`;

const Wrapper = styled.div`
  position: relative;

  &:focus-within {
    ${StyledSearchIcon} {
      path {
        stroke: ${(props) => props.theme.colors.blueCrayola};
      }
    }
  }
`;

const ComboboxInput = styled.input.attrs({ type: "text" })<{
  $leftIcon?: boolean;
  $rightIcon?: boolean;
}>`
  width: 100%;
  padding: 8px 10px;
  ${(props) => props.$leftIcon && `padding-left: 34px;`}
  ${(props) => props.$rightIcon && `padding-right: 34px;`}
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.babyPowder};
  color: ${(props) => props.theme.colors.bistre};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 400;
  transition-property: box-shadow, border;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &::placeholder {
    color: ${(props) => props.theme.colors.grey400};
  }

  &:focus {
    outline: 0;
    border-color: ${(props) => props.theme.colors.blueCrayola};
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.blueCrayola50};
  }
`;

const Combobox = <T extends unknown>(
  props: IComboboxProps<T>
): ReactElement | null => {
  const {
    options,
    placeholder,
    filterOptions,
    handleSelect,
    isOptionSelected,
    optionComponent,
    leftIcon,
    rightIcon,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [isListboxExpanded, setIsListboxExpanded] = useState<boolean>(false);
  const [listboxOptions, setListboxOptions] = useState<T[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Filter options when inputValue changes
  useEffect(() => {
    const newListboxOptions = filterOptions(inputValue);
    setListboxOptions(newListboxOptions);
    if (newListboxOptions.length < activeIndex) {
      setActiveIndex(0);
    }
  }, [inputValue, options]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setIsListboxExpanded(true);
    setActiveIndex(-1);
  };

  const handleInputBlur = () => {
    setIsListboxExpanded(false);
  };

  const getPrevIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === 0) {
      return listboxOptions.length - 1;
    }
    return activeIndex - 1;
  };

  const getNextIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === listboxOptions.length - 1) {
      return 0;
    }
    return activeIndex + 1;
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(getPrevIndex());
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(getNextIndex());
        break;
      case "Enter":
        if (activeIndex !== -1) {
          handleSelect(listboxOptions[activeIndex]);
        }
        break;
    }
  };

  return (
    <Wrapper>
      <div
        aria-haspopup="listbox"
        aria-owns="listbox"
        aria-expanded={isListboxExpanded}
      >
        {leftIcon && <StyledSearchIcon />}
        <ComboboxInput
          role="combobox"
          aria-autocomplete="list"
          aria-controls="listbox"
          aria-activedescendant="active-option"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          $leftIcon={leftIcon}
          $rightIcon={rightIcon}
        />
        {rightIcon && <StyledChevronIcon />}
      </div>
      <Listbox
        options={listboxOptions}
        isExpanded={isListboxExpanded}
        activeIndex={activeIndex}
        handleSelect={handleSelect}
        isOptionSelected={isOptionSelected}
        optionComponent={optionComponent}
      />
    </Wrapper>
  );
};

export default Combobox;
