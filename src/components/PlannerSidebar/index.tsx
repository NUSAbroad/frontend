import React from "react";
import styled from "styled-components";

import { Divider } from "../Styles";
import PlannerSearchBar from "./components/PlannerSearchBar";
import PlannerSideList from "./components/PlannerSideList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PlannerSidebar: React.FC = () => {
  return (
    <Wrapper>
      <PlannerSearchBar />
      <PlannerSideList />
      <Divider />
    </Wrapper>
  );
};

export default PlannerSidebar;
