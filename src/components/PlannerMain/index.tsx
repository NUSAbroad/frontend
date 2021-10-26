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
  gap: 0.8rem;
  margin-bottom: 1rem;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-direction: column;
    align-items: center;
  }
`;

const NoUniversityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  margin-top: 15vh;

  @media (max-width: ${(props) => props.theme.breakPoints.lg}) {
    margin: 10vh 0;
  }
`;

const StyledUniversityIcon = styled(UniversityIcon)`
  max-width: 50%;
  height: auto;
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
        <ViewToggle currView={currView} />
      </HeaderSection>
      {unis.length === 0 && (
        <NoUniversityWrapper>
          <StyledUniversityIcon />
          <Body1>You have yet to add any universities.</Body1>
          <Button onClick={onFindUniversitiesClickHandler}>
            Find Universities
          </Button>
        </NoUniversityWrapper>
      )}
      {currView == View.MAPPINGS && <MappingsView unis={unis} />}
      {currView == View.SIDE_BY_SIDE && <SideBySideView unis={unis} />}
    </div>
  );
};

export default PlannerMain;
