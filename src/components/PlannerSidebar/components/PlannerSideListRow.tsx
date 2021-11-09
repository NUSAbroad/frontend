import React from "react";
import styled from "styled-components";

import { ReactComponent as TrashIcon } from "../../../assets/trash.svg";
import { useAppDispatch } from "../../../redux/hooks";
import { removeUni } from "../../../redux/plannerSlice";
import { setToast } from "../../../redux/toastSlice";
import { countMCs } from "../../../utils/countMCs";
import { Body2, StyledLink, Subheading } from "../../Styles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledBody2 = styled(Body2)`
  margin-top: 5px;
`;

const Button = styled.button`
  flex-shrink: 0;
  height: 30px;
  width: 30px;
  padding: 3px;
  border: 0;
  border-radius: 3px;
  background: none;
  cursor: pointer;
  transition-property: box-shadow, background;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;

  &:hover {
    background: ${(props) => props.theme.colors.orangeSoda};

    svg path {
      stroke: ${(props) => props.theme.colors.floralWhite};
      stroke-width: 1.5px;
      transition-property: stroke, stroke-width;
      transition-duration: 0.2s;
      transition-timing-function: ease-out;
    }
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors.orangeSoda50};
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
    dispatch(
      setToast({
        message: "University removed from planner",
        canUndo: true,
        undoMessage: "University re-added to planner",
      })
    );
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
      <Button onClick={handleRemoveUni}>
        <TrashIcon />
      </Button>
    </Wrapper>
  );
};

export default PlannerSideListRow;
