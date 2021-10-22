import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as ChevronIcon } from "../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../assets/search-small.svg";
import { BACKEND_URL } from "../constants";
import FilterDropdown from "./FilterDropdown";

const Wrapper = styled.div.attrs({ tabIndex: -1 })``;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
`;

const SearchBarInput = styled.input.attrs({ type: "text" })`
  padding: 0 10px;
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.bistre};
  background-color: ${(props) => props.theme.colors.babyPowder};
  border: none;
  outline: none;
  width: 100%;
`;

interface Props {
  filters: Types.Country[];
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
}

const FilterSearchBar: React.FC<Props> = (props) => {
  const { filters, setFilters } = props;
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [allCountries, setAllCountries] = useState<Types.Country[]>([]);
  const [dropdownCountries, setDropdownCountries] = useState<Types.Country[]>(
    []
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

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
    }
    setFilters(newFilters);
  };

  const handleEnterFilter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitFilter(currentFilter);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(e.target.value);
  };

  return (
    <Wrapper
      onFocus={() => setShowDropdown(true)}
      onBlur={() => setShowDropdown(false)}
    >
      <SearchBarWrapper>
        <SearchIcon />
        <SearchBarInput
          onKeyDown={handleEnterFilter}
          onChange={handleChangeInput}
          placeholder="Add a country..."
        />
        <ChevronIcon />
      </SearchBarWrapper>
      {showDropdown && dropdownCountries.length > 0 && (
        <FilterDropdown
          countries={dropdownCountries}
          submitFilter={submitFilter}
        />
      )}
    </Wrapper>
  );
};

export default FilterSearchBar;
