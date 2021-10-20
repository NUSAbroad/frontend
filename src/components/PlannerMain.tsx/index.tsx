import React from "react";
import styled from "styled-components";

import { View } from "../../constants/plannerViews";
import { useAppSelector } from "../../redux/hooks";
import { getCurrView, getUnis } from "../../redux/plannerSlice";
import MappingsView from "../MappingsView";
import SideBySideView from "../SideBySideView";
import { Heading3 } from "../Styles";
import ViewToggle from "./components/ViewToggle";

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
`;

const PlannerMain: React.FC = function () {
  const currView = useAppSelector(getCurrView);
  const unis = useAppSelector(getUnis);

  return (
    <div>
      <HeaderSection>
        <Heading3>My Universities</Heading3>
        <ViewToggle currView={currView} />
      </HeaderSection>
      {currView == View.MAPPINGS && <MappingsView unis={unis} />}
      {currView == View.SIDE_BY_SIDE && <SideBySideView unis={unis} />}
    </div>
  );
};

export default PlannerMain;
