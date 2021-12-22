import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Listbox from "./components/Listbox";

const Wrapper = styled.div`
  position: relative;
`;

const ComboboxInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
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

interface Props {
  options: any[];
  placeholder?: string;
  emptyMessage?: string;
  filterOptions: (filter: string) => any[];
  isOptionSelected: (option: any) => boolean;
  handleSelect: (option: any) => void;
}

const Combobox: React.FC<Props> = function (props) {
  const {
    options,
    placeholder,
    emptyMessage,
    filterOptions,
    isOptionSelected,
    handleSelect,
  } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [isListboxExpanded, setIsListboxExpanded] = useState<boolean>(false);
  const [listboxOptions, setListboxOptions] = useState<any[]>([]);
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
        />
      </div>
      <Listbox
        options={listboxOptions}
        isExpanded={isListboxExpanded}
        activeIndex={activeIndex}
        isOptionSelected={isOptionSelected}
        handleSelect={handleSelect}
        emptyMessage={emptyMessage}
      />
    </Wrapper>
  );
};

export default Combobox;
