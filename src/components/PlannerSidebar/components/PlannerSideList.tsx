import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/hooks";
import { getUnis } from "../../../redux/plannerSlice";
import { Body2 } from "../../Styles";
import PlannerSideListRow from "./PlannerSideListRow";

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px 30px;
`;

const StyledBody2 = styled(Body2)`
  text-align: center;
`;

const PlannerSideList: React.FC = () => {
  const unis = useAppSelector(getUnis);

  if (unis.length === 0) {
    return <StyledBody2>No universities added.</StyledBody2>;
  }

  return (
    <List>
      {unis.map((uni) => {
        return <PlannerSideListRow key={uni.id} uni={uni} />;
      })}
    </List>
  );
};

export default PlannerSideList;
