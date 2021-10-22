import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../redux/hooks";
import { getUnis } from "../../../redux/plannerSlice";
import { Body2 } from "../../Styles";
import PlannerSideListRow from "./PlannerSideListRow";

const StyledBody2 = styled(Body2)`
  text-align: center;
`;

const PlannerSideList: React.FC = () => {
  const unis = useAppSelector(getUnis);

  return (
    <>
      {unis.map((uni) => {
        return <PlannerSideListRow key={uni.id} uni={uni} />;
      })}
      {unis.length === 0 && <StyledBody2>No universities added.</StyledBody2>}
    </>
  );
};

export default PlannerSideList;
