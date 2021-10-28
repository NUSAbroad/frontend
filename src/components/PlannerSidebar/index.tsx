import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getUnis } from "../../redux/plannerSlice";
import { exportPlanner } from "../../utils/exportPlanner";
import { Button, Divider } from "../Styles";
import PlannerSearchBar from "./components/PlannerSearchBar";
import PlannerSideList from "./components/PlannerSideList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PlannerSidebar: React.FC = () => {
  const unis = useAppSelector(getUnis);

  const onExportClickHandler = () => {
    exportPlanner(unis);
  };

  return (
    <Wrapper>
      <Button onClick={onExportClickHandler}>Export Planner</Button>
      <PlannerSearchBar />
      <PlannerSideList />
      <Divider />
    </Wrapper>
  );
};

export default PlannerSidebar;
