import React from "react";
import styled, { useTheme } from "styled-components";

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
`;

const AdditionalInfo = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 30px;
  margin-bottom: 30px;
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

  return (
    <>
      <HeaderSection>
        <div>
          <Heading1 $color={theme.colors.blueCrayola}>{uni.name}</Heading1>
          <StyledBody1>
            {uni.state}, {uni.Country.name}
          </StyledBody1>
        </div>
        <Button>+ Add to Planner</Button>
      </HeaderSection>
      <Divider />
      <InfoSection>
        <div>
          <AdditionalInfo>
            {Object.entries(uni.additionalInfo).map(([key, value]) => (
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
        <UniversitySidebar semesters={[]} links={uni.Links} />
      </InfoSection>
    </>
  );
};

export default UniversityInfo;
