import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ReactComponent as UniversityIcon } from "../../assets/university.svg";
import { View } from "../../constants/plannerViews";
import { useAppSelector } from "../../redux/hooks";
import { getCurrView, getUnis } from "../../redux/plannerSlice";
import MappingsView from "../MappingsView";
import SideBySideView from "../SideBySideView";
import { Body1, Button, Heading3 } from "../Styles";
import ViewToggle from "./components/ViewToggle";

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
`;

const NoUniversityWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const StyledUniversityIcon = styled(UniversityIcon)`
  margin-top: 15vh;
`;

const StyledBody1 = styled(Body1)`
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const PlannerMain: React.FC = function () {
  const currView = useAppSelector(getCurrView);
  const unis = useAppSelector(getUnis);
  const history = useHistory();

  const onFindUniversitiesClickHandler = () => {
    history.push("/universities");
  };

  return (
    <div>
      <HeaderSection>
        <Heading3>My Universities</Heading3>
        {unis.length !== 0 && <ViewToggle currView={currView} />}
      </HeaderSection>
      {unis.length === 0 && (
        <NoUniversityWrapper>
          <StyledUniversityIcon />
          <StyledBody1>You have yet to add any universities.</StyledBody1>
          <StyledButton onClick={onFindUniversitiesClickHandler}>
            Find Universities
          </StyledButton>
        </NoUniversityWrapper>
      )}
      {currView == View.MAPPINGS && <MappingsView unis={unis} />}
      {currView == View.SIDE_BY_SIDE && <SideBySideView unis={unis} />}
    </div>
  );
};

export default PlannerMain;
