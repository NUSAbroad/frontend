import React from "react";
import styled from "styled-components";

import { Body1 } from "./Styles";

const Outer = styled.div`
  position: absolute;
`;

const Wrapper = styled.div<{ $top: number; $left: number; $width: number }>`
  position: fixed;
  top: ${(props) => props.$top + 45}px;
  left: ${(props) => props.$left - 1}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props) => props.$width + 1}px;
  max-width: calc(100% - 40px);
  max-height: 35vh;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  overflow-y: auto;
  z-index: 3;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    top: ${(props) => props.$top + 43}px;
  }

  @media (max-width: ${(props) => props.theme.breakPoints.sm}) {
    top: ${(props) => props.$top + 40}px;
  }
`;

const EmptyCell = styled.div`
  height: 45px; // hacky fix
  padding: 0;
`;

const StyledBody1 = styled(Body1)`
  padding: 10px;
`;

const DropdownItem = styled.div`
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.blueCrayola10};
    cursor: pointer;
  }
`;
interface Props {
  nusModules: Types.NusModule[];
  onDropdownItemClickHandler: (nusModule: Types.NusModule) => void;
  rowRef: React.MutableRefObject<HTMLTableRowElement | null>;
}

const MappingDropdown: React.FC<Props> = (props) => {
  const { nusModules, onDropdownItemClickHandler, rowRef } = props;
  const rect = rowRef.current?.getBoundingClientRect();
  const nusHeader = document.getElementById("nus-header");

  return (
    <Outer>
      <Wrapper
        $top={rect?.top ?? 0}
        $left={rect?.left ?? 0}
        $width={nusHeader?.offsetWidth ?? 0}
      >
        {nusModules.length === 0 ? (
          <EmptyCell>
            <StyledBody1>No modules found</StyledBody1>
          </EmptyCell>
        ) : (
          nusModules.map((nusModule, index) => (
            <DropdownItem
              key={index}
              onMouseDown={() => onDropdownItemClickHandler(nusModule)}
            >
              <StyledBody1>
                {nusModule.code} {nusModule.name}
              </StyledBody1>
            </DropdownItem>
          ))
        )}
      </Wrapper>
    </Outer>
  );
};

export default MappingDropdown;
