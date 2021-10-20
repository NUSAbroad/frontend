import React from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUnis, setUnis } from "../../../redux/plannerSlice";
import { Body1 } from "../../Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  width: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.theme.colors.babyPowder};
  overflow: auto;
  max-height: 20vh;
`;

const WhiteBox = styled(Body1)`
  background-color: ${(props) => props.theme.colors.babyPowder};
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey300};
    cursor: pointer;
  }
`;

interface Props {
  unis: Types.University[];
}

const PlannerDropdown: React.FC<Props> = (props) => {
  const { unis } = props;
  const dispatch = useAppDispatch();
  const currentUnis = useAppSelector(getUnis);

  const handleAddUni = (uniToAdd: Types.University) => {
    const newUnis = [...currentUnis];
    const index = newUnis.findIndex((uni) => uni.id === uniToAdd.id);
    if (index === -1) {
      const removeMappings = { ...uniToAdd, mappingCount: 0, Mappings: [] };
      newUnis.push(removeMappings);
      dispatch(setUnis({ unis: newUnis }));
    }
  };

  return (
    <Wrapper>
      {unis.map((uni) => {
        return (
          <WhiteBox key={uni.id} onClick={() => handleAddUni(uni)}>
            {uni.name}
          </WhiteBox>
        );
      })}
    </Wrapper>
  );
};

export default PlannerDropdown;
