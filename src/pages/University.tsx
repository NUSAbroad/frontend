import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled, { useTheme } from "styled-components";

import Notice from "../components/Notice";
import { Body1, Button, Divider, Heading1 } from "../components/Styles";
import UniversitySidebar from "../components/UniversitySidebar";
import { BACKEND_URL } from "../constants";
import { getMonthAndYear } from "../utils/date";

const Container = styled.div`
  width: 90%;
  max-width: 1080px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 10px;
`;

const StyledBody1 = styled(Body1)`
  margin-top: 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
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

const NoticeList = styled.ol`
  margin: 10px 0 0;
`;

const University: React.FC = function () {
  const theme = useTheme();
  const { slug } = useParams<{ slug: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [uni, setUni] = useState<Types.University | null>(null);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/universities/${slug}`)
      .then((response) => {
        setLoading(false);
        setUni(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) {
    return <span>Loading</span>;
  }

  if (uni == null) {
    return <span>Error</span>;
  }

  return (
    <Container>
      <Header>
        <div>
          <Heading1 $color={theme.colors.blueCrayola}>{uni.name}</Heading1>
          <StyledBody1>
            {uni.state}, {uni.Country.name}
          </StyledBody1>
        </div>
        <Button>+ Add to Planner</Button>
      </Header>
      <Divider />
      <Info>
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
            <Body1>
              Interested in this university? Do refer to their website to better
              understand their restrictions. Here are a few questions that you
              might want to consider:
            </Body1>
            <br />
            <Body1>
              1. Are they accepting exchange students in my semester?
            </Body1>
            <Body1>
              2. Are they accepting exchange students from my fauculty?
            </Body1>
            <Body1>
              3. Are they accepting Bachelor level exchange students?
            </Body1>
          </Notice>
        </div>
        <UniversitySidebar semesters={[]} links={uni.Links} />
      </Info>
    </Container>
  );
};

export default University;
