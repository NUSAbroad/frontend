import React from "react";
import styled, { useTheme } from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addUni, getUnis, removeUni } from "../../redux/plannerSlice";
import { setToast } from "../../redux/toastSlice";
import { getMonthAndYear } from "../../utils/date";
import Notice from "../Notice";
import { Body1, Body2, Button, Divider, Heading1 } from "../Styles";
import UniversitySidebar from "../UniversitySidebar";

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 10px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
`;

const StyledBody1 = styled(Body1)`
  margin-top: 5px;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
  margin-top: 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
  }
`;

const AdditionalInfo = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 30px;
  margin-bottom: 30px;

  @media (max-width: ${(props) => props.theme.breakPoints.md}) {
    gap: 10px 20px;
    margin-bottom: 20px;
  }
`;

const InfoKey = styled(Body1)``;

const InfoValue = styled(Body1)`
  font-weight: 700;
`;

interface Props {
  uni: Types.University;
}

const UniversityInfo: React.FC<Props> = function (props) {
  const { uni } = props;
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const plannerUnis = useAppSelector(getUnis);

  const isUniInPlanner =
    plannerUnis.findIndex((plannerUni) => plannerUni.id == uni.id) !== -1;

  const handleAddToPlanner = () => {
    dispatch(addUni(uni));
    dispatch(setToast({ message: "University added to planner" }));
  };

  const handleRemoveFromPlanner = () => {
    dispatch(removeUni(uni));
    dispatch(
      setToast({
        message: "University removed from planner",
        canUndo: true,
        undoMessage: "University re-added to planner",
      })
    );
  };

  return (
    <>
      <HeaderSection>
        <div>
          <Heading1 $color={theme.colors.blueCrayola}>{uni.name}</Heading1>
          <StyledBody1>
            {uni.state && `${uni.state}, `}
            {uni.Country.name}
          </StyledBody1>
        </div>
        {isUniInPlanner ? (
          <Button
            onClick={handleRemoveFromPlanner}
            $color={theme.colors.orangeSoda}
            $focusColor={theme.colors.orangeSoda50}
          >
            Remove from Planner
          </Button>
        ) : (
          <Button onClick={handleAddToPlanner}>+ Add to Planner</Button>
        )}
      </HeaderSection>
      <Divider />
      <InfoSection>
        <div>
          <AdditionalInfo>
            {Object.entries(uni.additionalInfo ?? {}).map(([key, value]) => (
              <>
                <InfoKey>{key}</InfoKey>
                <InfoValue>{value}</InfoValue>
              </>
            ))}
            <InfoKey>Last Updated</InfoKey>
            <InfoValue>{getMonthAndYear(new Date(uni.updatedAt))}</InfoValue>
          </AdditionalInfo>
          <Notice>
            <Body2>
              Interested in this university? Do refer to their website to better
              understand their restrictions. Here are a few questions that you
              might want to consider:
            </Body2>
            <br />
            <Body2>
              1. Are they accepting exchange students in my semester?
            </Body2>
            <Body2>
              2. Are they accepting exchange students from my fauculty?
            </Body2>
            <Body2>
              3. Are they accepting Bachelor level exchange students?
            </Body2>
          </Notice>
        </div>
        <UniversitySidebar semesters={uni.Semesters} links={uni.Links} />
      </InfoSection>
    </>
  );
};

export default UniversityInfo;
