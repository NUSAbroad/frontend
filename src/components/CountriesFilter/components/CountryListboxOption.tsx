import { ReactElement } from "react";
import styled from "styled-components";

import { IListboxOptionProps } from "../../Combobox/types";
import { Body2 } from "../../Styles";

const Option = styled(Body2)<{ $active: boolean; $isSelected: boolean }>`
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
    font-weight: 700;
  `}
`;

const CountryListboxOption = (
  props: IListboxOptionProps<Types.Country>
): ReactElement | null => {
  const { option, index, activeIndex, handleSelect, isOptionSelected } = props;
  const active = activeIndex === index;

  const isSelected = isOptionSelected?.(option) ?? false;

  const handleClick = () => {
    handleSelect(option);
  };

  return (
    <Option
      $isSelected={isSelected}
      $active={active}
      id={active ? "active-option" : undefined}
      aria-selected={active || undefined}
      onClick={handleClick}
    >
      {option.name}
    </Option>
  );
};

export default CountryListboxOption;
