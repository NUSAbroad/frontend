import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as ChevronIcon } from "../assets/chevron-down.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { BACKEND_URL } from "../constants";

const Wrapper = styled.div`
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

interface Props {
  filters: Types.Country[];
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSearchBar: React.FC<Props> = (props) => {
  const { filters, setFilters, setErrorMsg } = props;
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [allCountries, setAllCountries] = useState<Types.Country[]>([]);

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

  const submitFilter = () => {
    const relatedCountry = allCountries.find(
      (country) => currentFilter === country.name
    );
    const newFilters = [...filters];
    if (!relatedCountry) {
      setErrorMsg("Country is not found");
      return;
    }
    const isAlreadyExist = newFilters.find(
      (country) => currentFilter === country.name
    );
    if (!isAlreadyExist) {
      newFilters.push(relatedCountry);
    }
    setFilters(newFilters);
    setErrorMsg("");
  };

  const handleClickSearchIcon = () => {
    submitFilter();
  };

  const handleEnterFilter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitFilter();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFilter(e.target.value);
  };

  return (
    <Wrapper>
      <SearchIcon onClick={handleClickSearchIcon} />
      <SearchBarInput
        onKeyDown={handleEnterFilter}
        onChange={handleChangeInput}
      />
      <ChevronIcon />
    </Wrapper>
  );
};

export default FilterSearchBar;
