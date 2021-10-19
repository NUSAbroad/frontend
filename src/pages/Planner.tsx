import React from "react";
import styled from "styled-components";

import PlannerMain from "../components/PlannerMain.tsx";
import { View } from "../constants/plannerViews";
import { useAppSelector } from "../redux/hooks";
import { getCurrView } from "../redux/plannerSlice";

const Container = styled.div<{ $currView: View }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 50px;
  width: 100%;
  ${(props) =>
    props.$currView === View.MAPPINGS &&
    `
    max-width: 1440px;
  `};
  margin: 0 auto;
  padding: 30px;
`;

const Planner: React.FC = () => {
  const currView = useAppSelector(getCurrView);

  return (
    <Container $currView={currView}>
      <PlannerMain />
      <div style={{ minWidth: "300px" }}>Planner Sidebar</div>
    </Container>
  );
};

export default Planner;
