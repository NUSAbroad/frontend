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
`;

interface Props {
  unis: Types.University[];
  activeIndex: number;
}

const PlannerDropdown: React.FC<Props> = (props) => {
  const { unis, activeIndex } = props;

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
      {unis.map((uni, index) => (
        <DropdownItem
          key={index}
          uni={uni}
          index={index}
          activeIndex={activeIndex}
        />
      ))}
    </Wrapper>
  );
};

export default PlannerDropdown;
