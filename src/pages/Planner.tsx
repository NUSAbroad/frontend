import React from "react";
import styled from "styled-components";

import PlannerMain from "../components/PlannerMain";
import PlannerSidebar from "../components/PlannerSidebar";
import SEO from "../components/SEO";
import { View } from "../constants/plannerViews";
import { useAppSelector } from "../redux/hooks";
import { getCurrView } from "../redux/plannerSlice";

const Container = styled.div<{ $currView: View }>`
  gap: 30px;
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;

  ${(props) =>
    props.$currView === View.MAPPINGS
      ? `
      display: grid;
      grid-template-columns: minmax(0, 1fr) 300px;
    `
      : `
      display: flex;
      flex-direction: column;
  `}

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const Planner: React.FC = () => {
  const currView = useAppSelector(getCurrView);

  return (
    <Container $currView={currView}>
      <SEO title="Planner" />
      <PlannerMain />
      <PlannerSidebar />
    </Container>
  );
};

export default Planner;
