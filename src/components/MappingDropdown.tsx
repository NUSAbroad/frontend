import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  z-index: 2;
  max-height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.colors.blueCrayola10};
    cursor: pointer;
  }
  width: 100%;
  padding: 4px 10px;
`;

interface Props {
  nusModules: Types.NusModule[];
  onClickHandler: (nusModule: Types.NusModule) => void;
}

const MappingDropdown: React.FC<Props> = (props) => {
  const { nusModules, onClickHandler } = props;
  return (
    <Wrapper>
      {nusModules.map((nusModule, index) => (
        <DropdownItem key={index} onClick={() => onClickHandler(nusModule)}>
          {nusModule.code} {nusModule.name}
        </DropdownItem>
      ))}
      {nusModules.length === 0 && "No modules found"}
    </Wrapper>
  );
};

export default MappingDropdown;
