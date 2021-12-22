import React, { useEffect } from "react";
import styled from "styled-components";

import { Body2 } from "../../Styles";
import ListboxOption from "./ListboxOption";

const StyledListbox = styled.div<{ $isExpanded?: boolean }>`
  position: absolute;
  top: 2rem;
  left: 0;
  display: ${(props) => (props.$isExpanded ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 35vh;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  overflow-y: auto;
`;

const EmptyMessage = styled(Body2)`
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  color: ${(props) => props.theme.colors.grey400};
`;

interface Props {
  options: any[];
  isExpanded?: boolean;
  activeIndex: number;
  isOptionSelected: (option: any) => boolean;
  handleSelect: (option: any) => void;
  emptyMessage?: string;
}

const Listbox: React.FC<Props> = function (props) {
  const {
    options,
    isExpanded,
    activeIndex,
    isOptionSelected,
    handleSelect,
    emptyMessage,
  } = props;

  // Ensure activeOption is always scrolled into view
  useEffect(() => {
    document.getElementById("active-option")?.scrollIntoView({
      block: "nearest",
      inline: "start",
    });
  }, [activeIndex]);

  return (
    <StyledListbox
      id="listbox"
      role="listbox"
      $isExpanded={isExpanded}
      onMouseDown={(e) => e.preventDefault()}
    >
      {options.map((option, index) => (
        <ListboxOption
          key={index}
          option={option}
          index={index}
          activeIndex={activeIndex}
          isOptionSelected={isOptionSelected}
          handleSelect={handleSelect}
        />
      ))}
      {options.length === 0 && (
        <EmptyMessage>{emptyMessage ?? "No results found"}</EmptyMessage>
      )}
    </StyledListbox>
  );
};

export default Listbox;
