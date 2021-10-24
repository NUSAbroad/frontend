import React from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Cross } from "../assets/cross.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { useAppDispatch } from "../redux/hooks";
import {
  addMapping,
  removeMapping,
  updateMapping,
} from "../redux/plannerSlice";
import { setToast } from "../redux/toastSlice";

interface BodyCellProps {
  $softBorder?: boolean;
  $isButton?: boolean;
  $width?: string;
  $minWidth?: string;
  $maxWidth?: string;
}

const BodyCell = styled.td<BodyCellProps>`
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => props.$minWidth && `min-width: ${props.$minWidth};`}
  ${(props) => props.$maxWidth && `max-width: ${props.$maxWidth};`}
  ${(props) =>
    props.$isButton &&
    `
    padding: 7px;
    width: 24px;
  `}

  &:not(:last-child) {
    border-right: 1px solid
      ${(props) =>
        props.$softBorder
          ? props.theme.colors.grey200
          : props.theme.colors.grey300};
  }
`;

const BodyRow = styled.tr`
  &:not(:last-child) {
    > ${BodyCell} {
      border-bottom: 1px solid ${(props) => props.theme.colors.grey300};
    }
  }

  &:hover {
    background: ${(props) => props.theme.colors.grey100};
  }

  &:last-child {
    ${BodyCell} {
      &:first-child {
        border-bottom-left-radius: 4px;
      }

      &:last-child {
        border-bottom-right-radius: 4px;
      }
    }
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background: none;
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.bistre};

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.blueCrayola50};
    background: ${(props) => props.theme.colors.babyPowder};
  }
`;

const Button = styled.button<{ $color: string; $focusColor: string }>`
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

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${(props) => props.$focusColor};
  }
`;

interface Props {
  mapping: Types.Mapping;
  isPlanner?: boolean;
  uni: Types.University;
}

const MappingsRow: React.FC<Props> = function (props) {
  const { mapping, isPlanner, uni } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const color = isPlanner ? theme.colors.orangeSoda : theme.colors.blueCrayola;
  const focusColor = isPlanner
    ? theme.colors.orangeSoda50
    : theme.colors.blueCrayola50;

  const handleClickButton = () => {
    if (isPlanner) {
      dispatch(removeMapping({ uniId: uni.id, mapping }));
      dispatch(
        setToast({
          message: "Mapping deleted from planner",
          canUndo: true,
          undoMessage: "Mapping re-added to planner",
        })
      );
    } else {
      dispatch(addMapping({ uni, mapping }));
      dispatch(setToast({ message: "Mapping added to planner" }));
    }
  };

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedMapping = {
        ...mapping,
        [field]: e.target.value,
      };
      dispatch(updateMapping({ uniId: uni.id, mapping: updatedMapping }));
    };

  const handleNumberChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedMapping = {
        ...mapping,
        [field]: parseInt(e.target.value),
      };
      dispatch(updateMapping({ uniId: uni.id, mapping: updatedMapping }));
    };

  return (
    <BodyRow>
      <BodyCell $softBorder $width="5%">
        <Input
          type="text"
          value={mapping.nusModuleFaculty}
          onChange={handleChange("nusModuleFaculty")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $softBorder>
        <Input
          type="text"
          value={mapping.nusModuleCode}
          onChange={handleChange("nusModuleCode")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $softBorder $width="30%" $minWidth="240px">
        <Input
          type="text"
          value={mapping.nusModuleName}
          onChange={handleChange("nusModuleName")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $width="5%">
        <Input
          type="number"
          min="0"
          value={mapping.nusModuleCredits}
          onChange={handleNumberChange("nusModuleCredits")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $softBorder>
        <Input
          type="text"
          value={mapping.partnerModuleCode}
          onChange={handleChange("partnerModuleCode")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $softBorder $width="30%" $minWidth="240px">
        <Input
          type="text"
          value={mapping.partnerModuleName}
          onChange={handleChange("partnerModuleName")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $width="5%">
        <Input
          type="number"
          min="0"
          value={mapping.partnerModuleCredits}
          onChange={handleNumberChange("partnerModuleCredits")}
          disabled={!isPlanner}
        />
      </BodyCell>
      <BodyCell $isButton $maxWidth="46px">
        <Button
          $color={color}
          $focusColor={focusColor}
          onClick={handleClickButton}
        >
          {isPlanner ? <Cross /> : <Plus />}
        </Button>
      </BodyCell>
    </BodyRow>
  );
};

export default MappingsRow;
