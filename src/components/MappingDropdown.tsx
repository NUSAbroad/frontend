import React from "react";
import styled from "styled-components";

import { Body1 } from "./Styles";

const Wrapper = styled.td`
  overflow-y: overlay;
  width: 50%;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  z-index: 999;
  top: 45px;
  left: -1px; // hacky fix
  max-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyCell = styled.div`
  height: 45px; // hacky fix
  padding: 0;
`;

const StyledBody1 = styled(Body1)`
  padding: 10px;
`;

const DropdownItem = styled.div`
  z-index: 999;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.colors.blueCrayola10};
    cursor: pointer;
  }
`;

interface Props {
  nusModules: Types.NusModule[];
  onDropdownItemClickHandler: (nusModule: Types.NusModule) => void;
}

const MappingDropdown: React.FC<Props> = (props) => {
  const { nusModules, onDropdownItemClickHandler } = props;

  return (
    <Wrapper>
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
  );
};

export default MappingDropdown;
