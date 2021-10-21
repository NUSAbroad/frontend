import React from "react";
import styled from "styled-components";

import { ReactComponent as TrashIcon } from "../../../assets/trash.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { removeUni } from "../../../redux/plannerSlice";
import { countMCs } from "../../../utils/countMCs";
import { Body2, StyledLink, Subheading } from "../../Styles";

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

const StyledBody2 = styled(Body2)`
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

  const handleRemoveUni = () => {
    dispatch(removeUni(uni));
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Subheading>
          <StyledLink to={`/universities/${uni.slug}`}>{uni.name}</StyledLink>
        </Subheading>
        <StyledBody2>
          {uni.state && `${uni.state}, `}
          {uni.Country.name} &bull; <b>{countMCs(uni.Mappings)}</b> MCs
        </StyledBody2>
      </InnerWrapper>
      <StyledTrashIcon onClick={handleRemoveUni} />
    </Wrapper>
  );
};

export default PlannerSideListRow;
