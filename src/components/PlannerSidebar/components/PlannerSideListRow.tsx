import React from "react";
import styled from "styled-components";

import { ReactComponent as TrashIcon } from "../../../assets/trash.svg";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUnis, setUnis } from "../../../redux/plannerSlice";
import { countMCs } from "../../../utils/countMCs";
import { Body1, Body2, StyledLink } from "../../Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  align-items: center;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledBody1 = styled(Body2)`
  margin: 5px 0;
`;

const StyledTrashIcon = styled(TrashIcon)`
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  uni: Types.University;
}

const PlannerSideListRow: React.FC<Props> = (props) => {
  const { uni } = props;
  const dispatch = useAppDispatch();
  const unis = useAppSelector(getUnis);

  const handleRemoveUni = () => {
    const newUnis = [...unis].filter((oldUni) => oldUni.id !== uni.id);
    dispatch(setUnis({ unis: newUnis }));
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Body1 $weight="700">
          <StyledLink to={`/universities/${uni.slug}`}>{uni.name}</StyledLink>
        </Body1>
        <StyledBody1>
          {uni.state && `${uni.state}, `}
          {uni.Country.name} &bull; <b>{countMCs(uni.Mappings)}</b> MCs
        </StyledBody1>
        <Body2></Body2>
      </InnerWrapper>
      <StyledTrashIcon onClick={handleRemoveUni} />
    </Wrapper>
  );
};

export default PlannerSideListRow;
