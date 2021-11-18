import React from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import { addUni } from "../../../redux/plannerSlice";
import analytics from "../../../utils/analytics";
import { Body2 } from "../../Styles";

const Item = styled(Body2)<{ $active: boolean }>`
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
`;

interface Props {
  uni: Types.University;
  index: number;
  activeIndex: number;
}

const DropdownItem: React.FC<Props> = function (props) {
  const { uni, index, activeIndex } = props;
  const dispatch = useAppDispatch();
  const active = activeIndex === index;

  const handleClick = () => {
    analytics.sendEvent({
      category: "Planner",
      action: "Added university to planner",
      label: "Planner Sidebar",
    });
    dispatch(addUni(uni));
  };

  return (
    <Item
      $active={active}
      id={active ? "active-option" : undefined}
      aria-selected={active || undefined}
      onClick={handleClick}
    >
      {uni.name}
    </Item>
  );
};

export default DropdownItem;
