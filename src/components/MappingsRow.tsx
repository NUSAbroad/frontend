import axios, { CancelToken } from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { ReactComponent as Cross } from "../assets/cross.svg";
import { ReactComponent as Plus } from "../assets/plus.svg";
import { BACKEND_URL } from "../constants";
import { useAppDispatch } from "../redux/hooks";
import {
  addMapping,
  removeMapping,
  updateMapping,
} from "../redux/plannerSlice";
import { setToast } from "../redux/toastSlice";
import MappingDropdown from "./MappingDropdown";

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
  position: relative;
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
  transition: box-shadow 0.2s ease-out;

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.blueCrayola50};
    background: ${(props) => props.theme.colors.babyPowder};
  }

  :disabled {
    -webkit-text-fill-color: ${(props) => props.theme.colors.bistre};
    opacity: 1;

    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
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
  transition-property: box-shadow, background;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:hover {
    background: ${(props) => props.$color};

    svg path {
      stroke: ${(props) => props.theme.colors.babyPowder};
      stroke-width: 2px;
      transition-property: stroke, stroke-width;
      transition-duration: 0.2s;
      transition-timing-function: ease-out;
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

  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelectAction, setIsSelectAction] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [nusModuleHits, setNusModuleHits] = useState([]);
  const firstModuleCodeUpdate = useRef(true);
  const firstModuleNameUpdate = useRef(true);
  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const color = isPlanner ? theme.colors.orangeSoda : theme.colors.blueCrayola;
  const focusColor = isPlanner
    ? theme.colors.orangeSoda50
    : theme.colors.blueCrayola50;

  // Trigger search by module code
  useEffect(() => {
    if (firstModuleCodeUpdate.current) {
      firstModuleCodeUpdate.current = false;
      return;
    }
    if (isSelectAction) {
      setIsSelectAction(false);
      return;
    }
    if (mapping.nusModuleCode.length >= 2) {
      const { cancel, token } = axios.CancelToken.source();
      const timeoutId = setTimeout(
        () => fetchModuleCodeHits(mapping.nusModuleCode, token),
        200
      );
      return () => (cancel("No longer last query"), clearTimeout(timeoutId));
    }
  }, [mapping.nusModuleCode]);

  // Trigger search by module name
  useEffect(() => {
    if (firstModuleNameUpdate.current) {
      firstModuleNameUpdate.current = false;
      return;
    }
    if (isSelectAction) {
      setIsSelectAction(false);
      return;
    }
    if (mapping.nusModuleName.length >= 2) {
      const { cancel, token } = axios.CancelToken.source();
      const timeoutId = setTimeout(
        () => fetchModuleNameHits(mapping.nusModuleName, token),
        200
      );
      return () => (cancel("No longer last query"), clearTimeout(timeoutId));
    }
  }, [mapping.nusModuleName]);

  // Hide dropdown on scroll
  useEffect(() => {
    const handleScroll: EventListener = () => {
      setShowDropdown(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      const value = e.target.value;
      if (field === "nusModuleCode" && value.length < 2) {
        setShowDropdown(false);
      }
      if (field === "nusModuleName" && value.length < 2) {
        setShowDropdown(false);
      }
      const updatedMapping = {
        ...mapping,
        [field]: value,
      };
      dispatch(updateMapping({ uniId: uni.id, mapping: updatedMapping }));
    };

  const handleNumberChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedMapping = {
        ...mapping,
        [field]: parseFloat(e.target.value),
      };
      dispatch(updateMapping({ uniId: uni.id, mapping: updatedMapping }));
    };

  const fetchModuleCodeHits = (query: string, token: CancelToken) => {
    axios
      .get(`${BACKEND_URL}/search/moduleCode/${query}`, { cancelToken: token })
      .then((response: { data: [] }) => {
        setNusModuleHits(response.data);
        setShowDropdown(true);
        if (response.data.length < activeIndex) {
          setActiveIndex(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchModuleNameHits = (query: string, token: CancelToken) => {
    axios
      .get(`${BACKEND_URL}/search/moduleName/${query}`, {
        cancelToken: token,
      })
      .then((response: { data: [] }) => {
        setNusModuleHits(response.data);
        setShowDropdown(true);
        if (response.data.length < activeIndex) {
          setActiveIndex(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDropdownItemClickHandler = (nusModule: Types.NusModule) => {
    setShowDropdown(false);
    setIsSelectAction(true);
    const updatedMapping = {
      ...mapping,
      nusModuleFaculty: nusModule.faculty,
      nusModuleCode: nusModule.code,
      nusModuleName: nusModule.name,
      nusModuleCredits: nusModule.credits,
    };
    dispatch(updateMapping({ uniId: uni.id, mapping: updatedMapping }));
  };

  const getPrevIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === 0) {
      return nusModuleHits.length - 1;
    }
    return activeIndex - 1;
  };

  const getNextIndex = () => {
    if (activeIndex === -1) {
      return 0;
    }
    if (activeIndex === nusModuleHits.length - 1) {
      return 0;
    }
    return activeIndex + 1;
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(getPrevIndex());
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(getNextIndex());
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex != -1) {
          onDropdownItemClickHandler(nusModuleHits[activeIndex]);
        }
        break;
    }
  };

  return (
    <BodyRow
      ref={rowRef}
      onBlur={() => setShowDropdown(false)}
      onKeyDown={handleKeyDown}
    >
      <BodyCell $softBorder $width="5%">
        <Input
          type="text"
          value={mapping.nusModuleFaculty}
          onChange={handleChange("nusModuleFaculty")}
          disabled={!isPlanner}
        />
        {showDropdown && (
          <MappingDropdown
            rowRef={rowRef}
            activeIndex={activeIndex}
            nusModules={nusModuleHits}
            onDropdownItemClickHandler={onDropdownItemClickHandler}
          />
        )}
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
          step=".1"
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
