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
  setFilters: React.Dispatch<React.SetStateAction<Types.Country[]>>;
}

const FilterSearchBar: React.FC<Props> = (props) => {
  const { setFilters } = props;
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

  return (
    <Wrapper>
      <SearchIcon />
      <SearchBarInput />
      <ChevronIcon />
    </Wrapper>
  );
};

export default FilterSearchBar;
