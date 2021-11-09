import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BACKEND_URL } from "../../../constants";
import { useAppDispatch } from "../../../redux/hooks";
import { addUni } from "../../../redux/plannerSlice";
import PlannerDropdown from "./PlannerDropdown";

const Container = styled.div`
  position: relative;
`;

const SearchBarInput = styled.input.attrs({ type: "text" })`
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

const PlannerSearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [allUnis, setAllUnis] = useState<Types.University[]>([]);
  const [dropdownUnis, setDropdownUnis] = useState<Types.University[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/search/general`)
      .then((response) => {
        setAllUnis(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    filterUniForDropdown();
  }, [allUnis, filter]);

  const filterUniForDropdown = () => {
    const toMatch = filter.toUpperCase();
    const newDropdownUnis = [...allUnis].filter((uni) => {
      return uni.name.toUpperCase().indexOf(toMatch) !== -1;
    });
    setDropdownUnis(newDropdownUnis);
    if (newDropdownUnis.length < activeIndex) {
      setActiveIndex(0);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const getPrevIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === 0) {
      return dropdownUnis.length - 1;
    }
    return activeIndex - 1;
  };

  const getNextIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === dropdownUnis.length - 1) {
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
        e.preventDefault();
        if (activeIndex !== -1) {
          dispatch(addUni(dropdownUnis[activeIndex]));
        }
        break;
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
    setActiveIndex(-1);
  };

  return (
    <Container
      tabIndex={-1}
      onFocus={handleFocus}
      onBlur={() => setShowDropdown(false)}
      onKeyDown={handleKeyDown}
    >
      <SearchBarInput
        role="combobox"
        aria-controls="autocomplete-listbox"
        aria-activedescendant="active-option"
        placeholder="Add university to list..."
        value={filter}
        onChange={handleChangeInput}
      />
      {showDropdown && dropdownUnis.length > 0 && (
        <PlannerDropdown unis={dropdownUnis} activeIndex={activeIndex} />
      )}
    </Container>
  );
};

export default PlannerSearchBar;
