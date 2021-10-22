import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BACKEND_URL } from "../../../constants";
import PlannerDropdown from "./PlannerDropdown";

const Wrapper = styled.div.attrs({ tabIndex: -1 })``;

const SearchBarInput = styled.input.attrs({ type: "text" })`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  color: ${(props) => props.theme.colors.bistre};
  font-size: ${(props) => props.theme.fontSizes.sm};
  font-weight: 400;

  &::placeholder {
    color: ${(props) => props.theme.colors.grey400};
  }

  &:focus {
    outline: 0;
    border-color: ${(props) => props.theme.colors.blueCrayola};
  }
`;

const PlannerSearchBar: React.FC = () => {
  const [allUnis, setAllUnis] = useState<Types.University[]>([]);
  const [dropdownUnis, setDropdownUnis] = useState<Types.University[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [currentUni, setCurrentUni] = useState<string>("");

  useEffect(() => {
    filterUniForDropdown();
  }, [allUnis, currentUni]);

  const filterUniForDropdown = () => {
    const toMatch = currentUni.toUpperCase();
    const newDropdownUnis = [...allUnis].filter((uni) => {
      return uni.name.toUpperCase().indexOf(toMatch) !== -1;
    });
    setDropdownUnis(newDropdownUnis);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentUni(e.target.value);
  };

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

  return (
    <Wrapper
      onFocus={() => setShowDropdown(true)}
      onBlur={() => setShowDropdown(false)}
    >
      <SearchBarInput
        placeholder="Add university to list..."
        onChange={handleChangeInput}
      />
      {showDropdown && dropdownUnis.length > 0 && (
        <PlannerDropdown unis={dropdownUnis} />
      )}
    </Wrapper>
  );
};

export default PlannerSearchBar;
