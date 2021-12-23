import { ReactElement, useEffect } from "react";
import styled from "styled-components";

import { IListboxProps } from "../types";

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
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  z-index: 2;
`;

const Listbox = <T extends unknown>(
  props: IListboxProps<T>
): ReactElement | null => {
  const {
    options,
    isExpanded,
    activeIndex,
    handleSelect,
    isOptionSelected,
    optionComponent: ListboxOption,
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
      onMouseDown={(e) => e.preventDefault()}
      $isExpanded={isExpanded}
    >
      {options.map((option, index) => (
        <ListboxOption
          key={index}
          option={option}
          index={index}
          activeIndex={activeIndex}
          handleSelect={handleSelect}
          isOptionSelected={isOptionSelected}
        />
      ))}
    </StyledListbox>
  );
};

export default Listbox;
