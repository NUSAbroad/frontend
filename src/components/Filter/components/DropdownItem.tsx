import React from "react";
import styled from "styled-components";

import { Body2 } from "../../Styles";

const Item = styled(Body2)<{ $active: boolean; $isSelected: boolean }>`
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.blueCrayola10};
    cursor: pointer;
  }

  ${(props) =>
    props.$active &&
    `
    background-color: ${props.theme.colors.blueCrayola10};
  `}

  ${(props) =>
    props.$isSelected &&
    `
    font-weight: 600;
  `}
`;

interface Props {
  country: Types.Country;
  filters: Types.Country[];
  index: number;
  activeIndex: number;
  handleClick: (newCountry: Types.Country) => void;
}

const DropdownItem: React.FC<Props> = function (props) {
  const { country, filters, index, activeIndex, handleClick } = props;
  const active = activeIndex === index;

  const handleItemClick = () => {
    handleClick(country);
  };

  const isSelected =
    filters.find((filter) => filter.name === country.name) != null;

  return (
    <Item
      $isSelected={isSelected}
      $active={active}
      id={active ? "active-option" : undefined}
      aria-selected={active || undefined}
      onClick={handleItemClick}
    >
      {country.name}
    </Item>
  );
};

export default DropdownItem;
