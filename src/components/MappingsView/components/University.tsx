import React from "react";
import styled, { useTheme } from "styled-components";

import { useAppDispatch } from "../../../redux/hooks";
import { removeUni } from "../../../redux/plannerSlice";
import { setToast } from "../../../redux/toastSlice";
import analytics from "../../../utils/analytics";
import { countMCs } from "../../../utils/countMCs";
import MappingsTable from "../../MappingsTable";
import { Body1, Button, Heading2, StyledLink } from "../../Styles";

const Container = styled.div`
  &:not(:last-child) {
    margin-bottom: 40px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBody1 = styled(Body1)`
  margin: 5px 0 10px;
`;

interface Props {
  uni: Types.University;
}

const University: React.FC<Props> = function (props) {
  const { uni } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleRemoveFromPlanner = () => {
    analytics.sendEvent({
      category: "Planner",
      action: "Removed university from planner",
      label: "Mappings View",
    });
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
    <Container>
      <HeaderSection>
        <Heading2 $color={theme.colors.blueCrayola}>
          <StyledLink to={`/universities/${uni.slug}`}>{uni.name}</StyledLink>
        </Heading2>
        <Button
          $color={theme.colors.orangeSoda}
          $focusColor={theme.colors.orangeSoda50}
          onClick={handleRemoveFromPlanner}
        >
          Remove
        </Button>
      </HeaderSection>
      <StyledBody1>
        {uni.state && `${uni.state}, `}
        {uni.Country.name} &bull; <b>{countMCs(uni.Mappings)}</b> MCs
      </StyledBody1>
      <MappingsTable mappings={uni.Mappings} isPlanner uni={uni} />
    </Container>
  );
};

export default University;
