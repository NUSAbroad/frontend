import React from "react";
import styled from "styled-components";

import { useAppSelector } from "../../redux/hooks";
import { getUnis } from "../../redux/plannerSlice";
import analytics from "../../utils/analytics";
import { exportPlanner } from "../../utils/exportPlanner";
import { Button, Divider } from "../Styles";
import PlannerSearchBar from "./components/PlannerSearchBar";
import PlannerSideList from "./components/PlannerSideList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: sticky;
  top: 78px;
  height: fit-content;
`;

const PlannerSidebar: React.FC = () => {
  const unis = useAppSelector(getUnis);

  const onExportClickHandler = () => {
    analytics.sendEvent({
      category: "Planner",
      action: "Exported planner as Word Doc",
    });
    exportPlanner(unis);
  };

  return (
    <Wrapper>
      <Button onClick={onExportClickHandler}>Download as .docx</Button>
      <PlannerSearchBar />
      <PlannerSideList />
      <Divider />
    </Wrapper>
  );
};

export default PlannerSidebar;
