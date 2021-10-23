import React, { useEffect } from "react";
import styled from "styled-components";

import DropdownItem from "./DropdownItem";

const Wrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 35vh;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  overflow-y: auto;
  z-index: 2;
`;

interface Props {
  countries: Types.Country[];
  filters: Types.Country[];
  activeIndex: number;
  handleClick: (newCountry: Types.Country) => void;
}

const FilterDropdown: React.FC<Props> = (props) => {
  const { countries, filters, activeIndex, handleClick } = props;

  useEffect(() => {
    document.getElementById("active-option")?.scrollIntoView({
      block: "nearest",
      inline: "start",
    });
  }, [activeIndex]);

  return (
    <Wrapper
      id="autocomplete-listbox"
      role="listbox"
      onMouseDown={(e) => e.preventDefault()}
    >
      {countries.map((country, index) => (
        <DropdownItem
          key={index}
          country={country}
          filters={filters}
          index={index}
          activeIndex={activeIndex}
          handleClick={handleClick}
        />
      ))}
    </Wrapper>
  );
};

export default FilterDropdown;
