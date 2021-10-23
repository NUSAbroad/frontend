import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { ReactComponent as ChevronIcon } from "../../../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../../../assets/search-small.svg";
import { BACKEND_URL } from "../../../constants";
import FilterDropdown from "./FilterDropdown";

const IconStyles = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSearchIcon = styled(SearchIcon)`
  ${IconStyles}
  left: 8px;
`;
const StyledChevronIcon = styled(ChevronIcon)`
  ${IconStyles}
  right: 8px;
  cursor: pointer;
`;

const Container = styled.div`
  position: relative;

  &:focus-within {
    ${StyledSearchIcon} {
      path {
        stroke: ${(props) => props.theme.colors.blueCrayola};
      }
    }
  }
`;

const SearchBarInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 8px 34px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background: ${(props) => props.theme.colors.babyPowder};
  color: ${(props) => props.theme.colors.bistre};
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.sm};

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
  filters: Types.Country[];
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
}

const FilterSearchBar: React.FC<Props> = (props) => {
  const { filters, setFilters } = props;
  const ref = useRef<HTMLInputElement | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [allCountries, setAllCountries] = useState<Types.Country[]>([]);
  const [dropdownCountries, setDropdownCountries] = useState<Types.Country[]>(
    []
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/countries`)
      .then((response) => {
        setAllCountries(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    filterCountryForDropdown();
  }, [allCountries, currentFilter]);

  const filterCountryForDropdown = () => {
    const toMatch = currentFilter.toUpperCase();
    const newDropdownCountries = [...allCountries].filter((country) => {
      return country.name.toUpperCase().indexOf(toMatch) !== -1;
    });
    setDropdownCountries(newDropdownCountries);
    if (newDropdownCountries.length < activeIndex) {
      setActiveIndex(0);
    }
  };

  const submitFilter = (filter: string) => {
    const relatedCountry = allCountries.find(
      (country) => filter.toUpperCase() === country.name.toUpperCase()
    );
    const newFilters = [...filters];
    if (!relatedCountry) {
      return;
    }
    const isAlreadyExist = newFilters.find(
      (country) => filter.toUpperCase() === country.name.toUpperCase()
    );
    if (!isAlreadyExist) {
      newFilters.push(relatedCountry);
      setCurrentFilter("");
      ref.current?.blur();
    }
    setFilters(newFilters);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(e.target.value);
  };

  const addNewFilter = (newCountry: Types.Country) => {
    if (filters.find((country) => country.name === newCountry.name)) {
      return;
    }
    setFilters([...filters, newCountry]);
  };

  const getPrevIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === 0) {
      return dropdownCountries.length - 1;
    }
    return activeIndex - 1;
  };

  const getNextIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === dropdownCountries.length - 1) {
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
        if (activeIndex === -1) {
          submitFilter(currentFilter);
        } else {
          addNewFilter(dropdownCountries[activeIndex]);
          setCurrentFilter("");
          ref.current?.blur();
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
      <StyledSearchIcon />
      <SearchBarInput
        ref={ref}
        role="combobox"
        aria-controls="autocomplete-listbox"
        aria-activedescendant="active-option"
        placeholder="Add a country..."
        value={currentFilter}
        onChange={handleChangeInput}
      />
      <StyledChevronIcon />
      {showDropdown && dropdownCountries.length > 0 && (
        <FilterDropdown
          countries={dropdownCountries}
          filters={filters}
          activeIndex={activeIndex}
          handleClick={addNewFilter}
        />
      )}
    </Container>
  );
};

export default FilterSearchBar;
