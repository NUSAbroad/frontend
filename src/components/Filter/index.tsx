import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BACKEND_URL } from "../../constants";
import Combobox from "../Combobox";
import CountryListboxOption from "./components/CountryListboxOption";
import FilterTag from "./components/FilterTag";

const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
`;

interface Props {
  filters: Types.Country[];
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
}

const Filter: React.FC<Props> = function (props) {
  const { filters, setFilters } = props;
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

  const deleteFilter = (filter: Types.Country) => {
    const newFilters = [...filters];
    newFilters.splice(newFilters.indexOf(filter), 1);
    setFilters(newFilters);
  };

  /* ---------- Combobox helper functions ---------- */
  const filterCountries = (filter: string) => {
    const toMatch = filter.toLowerCase();
    const filteredCountries = [...allCountries].filter((country) => {
      return country.name.toLowerCase().indexOf(toMatch) !== -1;
    });

    return filteredCountries;
  };

  const isCountrySelected = (country: Types.Country): boolean =>
    filters.find((filteredCountry) => filteredCountry.name === country.name) !=
    null;

  const handleSelectCountry = (country: Types.Country) => {
    if (isCountrySelected(country)) {
      deleteFilter(country);
    } else {
      setFilters([...filters, country]);
    }
  };
  /* ----------------------------------------------- */

  return (
    <>
      <Combobox
        options={allCountries}
        placeholder="Add a country..."
        filterOptions={filterCountries}
        isOptionSelected={isCountrySelected}
        handleSelect={handleSelectCountry}
        optionComponent={CountryListboxOption}
        leftIcon
        rightIcon
      />
      <TagsWrapper>
        {filters.map((tag) => (
          <FilterTag key={tag.id} tag={tag} deleteFilter={deleteFilter} />
        ))}
      </TagsWrapper>
    </>
  );
};

export default Filter;
