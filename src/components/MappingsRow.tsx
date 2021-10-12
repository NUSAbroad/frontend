import React from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Cross } from "../assets/cross.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";

const BodyRow = styled.tr`
  &:not(:last-child) {
    > td {
      border-bottom: 1px solid ${(props) => props.theme.colors.grey300};
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.grey100};
  }
`;

const BodyCell = styled.td<{ $softBorder?: boolean; $isButton?: boolean }>`
  padding: 10px;

  ${(props) =>
    props.$isButton &&
    `
    padding: 7px;
    width: 24px;
  `};

  &:not(:last-child) {
    border-right: 1px solid
      ${(props) =>
        props.$softBorder
          ? props.theme.colors.grey200
          : props.theme.colors.grey300};
  }
`;

const Button = styled.button<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid ${(props) => props.$color};
  border-radius: 100%;
  background: none;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.$color};

    svg path {
      stroke: ${(props) => props.theme.colors.babyPowder};
      stroke-width: 2px;
    }
  }
`;

interface Props {
  mapping: Types.Mapping;
  isPlanner?: boolean;
}

const MappingsRow: React.FC<Props> = function (props) {
  const { mapping, isPlanner } = props;
  const theme = useTheme();

  const color = isPlanner ? theme.colors.orangeSoda : theme.colors.blueCrayola;

  return (
    <BodyRow>
      <BodyCell $softBorder>{mapping.nusModuleFaculty}</BodyCell>
      <BodyCell $softBorder>{mapping.nusModuleCode}</BodyCell>
      <BodyCell $softBorder>{mapping.nusModuleName}</BodyCell>
      <BodyCell>{mapping.nusModuleCredits}</BodyCell>
      <BodyCell $softBorder>{mapping.partnerModuleCode}</BodyCell>
      <BodyCell $softBorder>{mapping.partnerModuleName}</BodyCell>
      <BodyCell>{mapping.partnerModuleCredits}</BodyCell>
      <BodyCell $isButton>
        <Button $color={color} onClick={() => console.log("clicked")}>
          {isPlanner ? <Cross /> : <Plus />}
        </Button>
      </BodyCell>
    </BodyRow>
  );
};

export default MappingsRow;
