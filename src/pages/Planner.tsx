import React from "react";
import styled from "styled-components";

import PlannerMain from "../components/PlannerMain";
import PlannerSidebar from "../components/PlannerSidebar";
import { View } from "../constants/plannerViews";
import { useDocumentTitle } from "../hooks/DocumentTitle";
import { useAppSelector } from "../redux/hooks";
import { getCurrView } from "../redux/plannerSlice";

const Container = styled.div<{ $currView: View }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Planner: React.FC = () => {
  useDocumentTitle("Planner");
  const currView = useAppSelector(getCurrView);

  return (
    <Container $currView={currView}>
      <PlannerMain />
      <PlannerSidebar />
    </Container>
  );
};

export default Planner;
