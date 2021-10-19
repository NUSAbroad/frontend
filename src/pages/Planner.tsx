import React from "react";
import styled from "styled-components";

import PlannerMain from "../components/PlannerMain.tsx";

const Container = styled.div`
  display: flex;
  gap: 50px;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Planner: React.FC = () => {
  return (
    <Container>
      <PlannerMain />
      <div>Planner Sidebar</div>
    </Container>
  );
};

export default Planner;
